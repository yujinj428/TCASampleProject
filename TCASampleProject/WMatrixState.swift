//
//  WMatrixFeature.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/01/25.
//

import WMatrixMobile
import ComposableArchitecture

struct WMatrixService: WMatrixProtocol {
    func onMatrixCreated(tag: String) {
        print("onMatrixCreated")
    }
    
    func onMatrixStarted(tag: String) {
        print("onMatrixStarted")
    }
    
    func onMatrixWebViewCreated(tag: String, matrixWebView: WMatrixMobile.WMatrixWebView?) {
        print("onMatrixWebViewCreated")
    }
    
    func onMatrixGroupSelect(group: WMatrixMobile.ServerGroup) {
        print("onMatrixGroupSelect")
    }
    
    func onDismissLoadingView() {
        print("onDismissLoadingView")
    }
    
    func onMatrixError(tag: String, error: WMatrixMobile.MatrixError) {
        print("onMatrixError")
    }
    
    
}

@Reducer
struct WMatrixState {
    struct State: Equatable {
        var create: Bool = false
        var start: Bool = false
        var selectedGroup: String = ""
        var showLoading: Bool = true
        var error:Bool = false
        var errorCode:String = ""
        var errorMessage:String = ""
    }
    
    struct MatrixError {
        var errorCode:String = ""
        var errorMessage:String = ""
    }
    
    enum Action {
        case onMatrixCreated
        case onMatrixStarted
        case onMatrixGroupSelect(String)
        case onDismissLoadingView
        case onMatrixError(MatrixError)
    }
    
    struct Environment {
        var matrixService: WMatrixService
    }
    
    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            case .onMatrixCreated:
                state.create = true
                return .none
            case .onMatrixStarted:
                state.start = true
                return .none
            case let .onMatrixGroupSelect(tag):
                state.selectedGroup = tag
                return .none
            case .onDismissLoadingView:
                state.showLoading = false
                return .none
            case let .onMatrixError(error):
                state.error = true
                state.errorCode = error.errorCode
                state.errorMessage = error.errorMessage
                return .none
            }
            
        }
    }
}
