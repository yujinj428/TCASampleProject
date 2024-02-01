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
    
    struct State: Equatable {
        var showLoadingView: Bool = true
        var isError: Bool = false
        var errorCode: String = ""
        var errorMessage: String = ""

    }
    
    enum Action {
        case initMatrix(delegate: WMatrixProtocol)
        case onMatrixCreated(tag: String)
        case onMatrixStarted(tag: String)
        case onMatrixGroupSelect(group: WMatrixMobile.ServerGroup)
        case onMatrixWebViewCreated(tag: String, matrixWebView: WMatrixWebView?)
        case onDismissLoadingView
        case onMatrixError(tag: String, error: WMatrixMobile.MatrixError)
    }
    
    @Dependency(\.wmatrixClient) var wmatrixClient
    
    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            case  let .initMatrix(delegate):
                
                return .run { _ in
                    await self.wmatrixClient.initWMatrix(delegate)
                }
 
            case let .onMatrixGroupSelect(serverGroup):
                
                
                return .run { _ in
                    await self.wmatrixClient.createWMatrix(serverGroup)
                }
           
            case let .onMatrixCreated(tag):
            
                return .run { _ in
                    await self.wmatrixClient.startWMatrix(tag)
                }
                
            case let .onMatrixStarted(tag):
 
                return .run { _ in
                    await self.wmatrixClient.makeWebView(tag)
                }
                
            case let .onMatrixWebViewCreated(tag, matrixWebView): // 여기로 webview가 넘어오면 터져요
                print("makewebview: \(tag)")
                return .none
                
            case .onDismissLoadingView:
                state.showLoadingView = false
                return .none
                
            case let .onMatrixError(_, error):
                state.isError = true
                state.errorCode = error.errorCode
                state.errorMessage = error.errorMessage
                return .none
            }
            
        }
        
    }
    
    
}
