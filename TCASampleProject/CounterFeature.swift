//
//  CounterFeature.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/01/23.
//

import SwiftUI
import ComposableArchitecture


// Reducer macro extends your type to conform to the Reducer protocol
@Reducer
struct Counter { // 기능 별로 feature을 나눔
    // domain modeling practice
    
    // hold the state
    struct State: Equatable { // View stores require equatable state
        var count = 0
        var fact: String?
        var isLoading = false
        var isTimerRunning = false
    }
    
    // hold all the actions the user can perform in the feature
    enum Action {
        case decrementButtonTapped // 이름을 지을 때에는 유저의 행하는 동작으로
        case incrementButtonTapped
        case factButtonTapped
        case factResponse(String)
        case toggleTimerButtonTapped
        case timerTick
    }
    
    enum CancelID { case timer }
    
    var body: some Reducer<State, Action> {
        
        // evolves the state from its current value to the next value given a user action
        // returns any effects that the feature wants to execute in the outside world
        Reduce { state, action in // state is provided as inout
            switch action {
            case .decrementButtonTapped:
                state.count -= 1
                state.fact = nil
                return .none // 나중엔 effect를 return 하는 것 + feeding data back into the system
            case .incrementButtonTapped:
                state.count += 1
                state.fact = nil
                return .none
                
            case .factButtonTapped:
                state.fact = nil
                state.isLoading = true
                
                /*
                 let (data, _) = try await URLSession.shared
                 .data(from: URL(string: "http://numbersapi.com/\(state.count)")!)
                 // 🛑 'async' call in a function that does not support concurrency
                 // 🛑 Errors thrown from here are not handled
                 
                 state.fact = String(decoding: data, as: UTF8.self)
                 state.isLoading = false
                 */
                
                // which represents an asynchronous unit that is run by the Store
                // -> to make a network request, and then feed that information back into the reducer
                return .run { [count = state.count] send in // send action back
                    //  run(priority:operation:catch:fileID:line:)
                    let (data, _) = try await URLSession.shared
                        .data(from: URL(string: "http://numbersapi.com/\(count)")!)
                    let fact = String(decoding: data, as: UTF8.self)
                    
                    // sendable closure cannot capture inout state
                    // state.fact = fact
                    await send(.factResponse(fact))
                    
                }
                
            case let .factResponse(fact):
                state.fact = fact
                state.isLoading = false
                return .none
                
            case .toggleTimerButtonTapped:
                state.isTimerRunning.toggle()
                if state.isTimerRunning {
                    return .run { send in
                        
                        if #available(iOS 16.0, *) {
                            while true {
                                try await Task.sleep(for: .seconds(1))
                                await send(.timerTick)
                            }
                        }
                    }
                    .cancellable(id: CancelID.timer) // 조건에 따라 effect를 cancel 해야할 경우 달아줄 것
                } else {
                    return .cancel(id: CancelID.timer)
                }
                
                
                
            case .timerTick:
                state.count += 1
                state.fact = nil
                return .none
            }
        }
    }
}

struct CounterView: View {
    
    // view에 의해 observed 될 필요가 없기에 let
    let store: StoreOf<Counter> // represents the runtime of my feature -> update state, execute effect and feed data into the system
    
    var body: some View {
        
        /*
        currently we are observing all state in the store by using $0,
         but typicall features hold onto a lot more state than what is needed in the view -> Performance 참고
        */
        
        WithViewStore(self.store, observe: { $0 }) { viewStore in // store를 직접적으로 접근하지 않고 viewStore를 통해 접근
            VStack {
                Text("\(viewStore.count)") // state를 get
                    .font(.largeTitle)
                    .padding()
                    .background(Color.black.opacity(0.1))
                    .cornerRadius(10)
                  HStack {
                    Button("➖") {
                        viewStore.send(.decrementButtonTapped) // state를 set할 때는 action을 매개로 reducer 사용
                    }
                    .font(.largeTitle)
                    .padding()
                    .background(Color.black.opacity(0.1))
                    .cornerRadius(10)
                    
                    Button("➕") {
                        viewStore.send(.incrementButtonTapped)
                    }
                    .font(.largeTitle)
                    .padding()
                    .background(Color.black.opacity(0.1))
                    .cornerRadius(10)
                }
                
                Button(viewStore.isTimerRunning ? "Stop timer" : "Start timer") {
                          viewStore.send(.toggleTimerButtonTapped)
                        }
                        .font(.largeTitle)
                        .padding()
                        .background(Color.black.opacity(0.1))
                        .cornerRadius(10)
                
                Button("Fact") {
                         viewStore.send(.factButtonTapped)
                       }
                       .font(.largeTitle)
                       .padding()
                       .background(Color.black.opacity(0.1))
                       .cornerRadius(10)
                
                if viewStore.isLoading {
                  ProgressView()
                } else if let fact = viewStore.fact {
                  Text(fact)
                    .font(.largeTitle)
                    .multilineTextAlignment(.center)
                    .padding()
                }
            }
        }
       
    }
}








