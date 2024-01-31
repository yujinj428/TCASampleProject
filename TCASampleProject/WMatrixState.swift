//
//  WMatrixFeature.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/01/25.
//

import WMatrixMobile
import ComposableArchitecture

@DependencyClient
struct WMatrixClient {
    var create: @Sendable () async -> Void
}


@Reducer
struct WMatrixState {
    struct WMWebviewSet: Equatable, Identifiable {
        let id = UUID()
        var tag: String
        var matrixWebView: WMatrixWebView
        
        static func == (lhs: WMWebviewSet, rhs: WMWebviewSet) -> Bool {
            return lhs.id == rhs.id
        }
    }
    
    struct State: Equatable, Identifiable {
        let id: UUID
        var showLoadingView: Bool = true
        var isError: Bool = false
        var isCreate: [String] = []
        var isStart: [String] = []
        var errorCode: String = ""
        var errorMessage: String = ""
        var wmatrix: WMatrix?
//        var webViews: [WMWebviewSet] = []
       
    }
    
    enum Action {
        case initMatrix(delegate: WMatrixProtocol)
        case createIndividualMatrix(server: ServerData)
        case onMatrixCreated(tag: String)
        case onMatrixStarted(tag: String)
        case onMatrixGroupSelect(group: WMatrixMobile.ServerGroup)
        case onMatrixWebViewCreated(tag: String, matrixWebView: WMatrixWebView?)
        case onDismissLoadingView
        case onMatrixError(tag: String, error: WMatrixMobile.MatrixError)
    }
    
    @Dependency(\.uuid) var uuid
    
    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            case  let .initMatrix(delegate):
                
                
                if state.wmatrix != nil {
                    return .none
                }
                
                state.wmatrix = WMatrix(delegate: delegate)
                
                let useServerSelectScreen:Bool = TargetInfo.getUseSeverSelect()
                
                if useServerSelectScreen {
                    state.wmatrix?.showServerSelect()
                    return .none
                }
                
                if let serverGroup = state.wmatrix?.getStartServerGroupFromConfig() {
                    WMLog.debug(msg: "groupName:\(serverGroup.groupName), serverList:\(serverGroup.serverList)")
                    return .run { send in
                        await send(.onMatrixGroupSelect(group: serverGroup))
                    }
                } else {
                    WMLog.debug(msg: "WMatrixConfig.plist에 startServerGroup이름을 확인하세요.")
                }
                
                return .none
                
            case let .onMatrixGroupSelect(serverGroup):
                
                
                return .run { send in
                    serverGroup.serverList.forEach { serverData in
                        Task {
                            await send(.createIndividualMatrix(server: serverData))
                        }
                    }
                    
                }
                
            case let .createIndividualMatrix(server):
                
                if state.isCreate.contains(server.name) {
                    return .none
                }
                
                state.wmatrix?.create(tag: server.name, serverData: server, webViewOptions: WebViewOptions())
                state.isCreate.append(server.name)
                
                return .none
                
            case let .onMatrixCreated(tag):
            
                return .none
                
            case let .onMatrixStarted(tag):
                state.wmatrix?.makeWebView(tag: tag, async: true)
                return .none
                
            case let .onMatrixWebViewCreated(tag, matrixWebView):
//                if let webview = matrixWebView,
//                    state.webViews.filter({$0.tag == tag}).isEmpty {
//                    webview.loadStartPage()
//                    state.webViews.append(WMWebviewSet(tag: tag, matrixWebView: webview))
//                }
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
