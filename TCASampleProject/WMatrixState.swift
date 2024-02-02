//
//  WMatrixFeature.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/01/25.
//

import WMatrixMobile
import ComposableArchitecture

@Reducer
struct WMatrixState {
    
    struct Alert: Equatable {
        typealias Handler = () -> Void
        
        let uuid = UUID()
        let title: String
        let message: String
        let action: Handler
        
        static func == (lhs: WMatrixState.Alert, rhs: WMatrixState.Alert) -> Bool {
            lhs.uuid == rhs.uuid
        }
    }
    
    enum MatrixLifeCycle: Equatable {
        case none
        case created
        case started
        case error
    }
    
    struct State: Equatable {
        var matrixPhase: MatrixLifeCycle = .none
        var showLoadingView: Bool = true
        var showAlert: Bool = false
        var alert: Alert?
    }
    
    enum Action {
        case initMatrix(delegate: WMatrixProtocol, options: WebViewOptions)
        case onMatrixCreated(tag: String)
        case onMatrixStarted(tag: String)
        case onMatrixGroupSelect(group: WMatrixMobile.ServerGroup)
        case onDismissLoadingView
        case onMatrixError(tag: String, error: WMatrixMobile.MatrixError)
        case onAlert(title: String, message: String)
    }
    
    @Dependency(\.wmatrixClient) var wmatrixClient
    
    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
                
            case let .initMatrix(delegate, options):
                
                return .run { _ in
                    await self.wmatrixClient.initWMatrix(delegate, options)
                }
 
            case let .onMatrixGroupSelect(serverGroup):
                
                return .run { _ in
                    await self.wmatrixClient.createWMatrix(serverGroup)
                }
           
            case let .onMatrixCreated(tag):
                state.matrixPhase = .created
                return .run { _ in
                    await self.wmatrixClient.startWMatrix(tag)
                }
                
            case let .onMatrixStarted(tag):
                state.matrixPhase = .started
                return .run { _ in
                    await self.wmatrixClient.makeWebView(tag)
                }
                
            case .onDismissLoadingView:
                state.showLoadingView = false
                return .none
                
            case let .onMatrixError(_, error):
                state.matrixPhase = .error
                return .run { send in
                    await send(.onAlert(title: error.errorMessage, message: error.errorReason ?? error.errorCode))
                }
                
            case let .onAlert(title, message):
                state.alert = Alert(title: title, message: message) {
                    print("alert handler")
                }
                state.showAlert = true
                return .none
            }
            
        }
        
    }
    
    
}
