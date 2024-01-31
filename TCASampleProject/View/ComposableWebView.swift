//
//  ComposableWMWebView.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/01/31.
//

import SwiftUI
import WMatrixMobile
import ComposableArchitecture


struct ComposableWebView: View{
   
    let store: StoreOf<WMatrixState>

    init(store: StoreOf<WMatrixState>) {
        self.store = store
        store.send(.initMatrix(delegate: self))
    }
    
    var body: some View {
        WithViewStore(self.store, observe: { $0 }) { viewStore in
              Text("webview")
//            if !viewStore.webViews.isEmpty {
//                let webviews = viewStore.webViews.map({$0.matrixWebView})
//                
//                ForEach(webviews, id:\.self) { webView in
//                    WMWebView(webView: webView)
//                        .ignoresSafeArea(.keyboard)
//                }
//            }
        }
    }
}

extension ComposableWebView: WMatrixProtocol {
    func onMatrixCreated(tag: String) {
        DispatchQueue.main.async {
            store.send(.onMatrixCreated(tag: tag))
        }
    }
    
    func onMatrixStarted(tag: String) {
        DispatchQueue.main.async {
            store.send(.onMatrixStarted(tag: tag))
        }
    }
    
    func onMatrixWebViewCreated(tag: String, matrixWebView: WMatrixMobile.WMatrixWebView?) {
        DispatchQueue.main.async {
            store.send(.onMatrixWebViewCreated(tag: tag, matrixWebView: matrixWebView))
        }
    }
    
    func onMatrixGroupSelect(group: WMatrixMobile.ServerGroup) {
        DispatchQueue.main.async {
            store.send(.onMatrixGroupSelect(group: group))
        }
    }
    
    func onDismissLoadingView() {
        DispatchQueue.main.async {
            store.send(.onDismissLoadingView)
        }
    }
    
    func onMatrixError(tag: String, error: WMatrixMobile.MatrixError) {
        DispatchQueue.main.async {
            store.send(.onMatrixError(tag: tag, error: error))
        }
    }
}




