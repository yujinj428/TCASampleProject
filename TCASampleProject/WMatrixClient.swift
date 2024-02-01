//
//  WMatrixActor.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/02/01.
//

import Foundation
import WMatrixMobile
import ComposableArchitecture

/*
 A type that represents a globally-unique actor that can be used to isolate various declarations anywhere in the program.
*/

@DependencyClient
struct WMatrixClient {
    var initWMatrix: @Sendable (WMatrixProtocol, WebViewOptions) async -> Void
    var createWMatrix: @Sendable (ServerGroup) async -> Void
    var startWMatrix: @Sendable (String) async -> Void
    var makeWebView: @Sendable (String) async -> Void
}

extension WMatrixClient: DependencyKey {
    static var liveValue: Self {
        let manager = WMatrixManager()
        return Self(
            initWMatrix: { delegate, options in
                await manager.initializeWMatrix(delegate: delegate, options: options)
            }, 
            createWMatrix: { group in
                await manager.create(group: group)
            }, 
            startWMatrix: { tag in
                await manager.start(tag: tag)
            },
            makeWebView: { tag in
                await manager.makeWebview(tag: tag)
            })
    }
}

extension DependencyValues {
    var wmatrixClient: WMatrixClient {
        get { self[WMatrixClient.self] }
        set { self[WMatrixClient.self] = newValue }
    }
}

private actor WMatrixManager: ObservableObject {
 
    private var wmatrix: WMatrix?
    private(set) var webviews: [WMatrixWebView] = []
    private var options: WebViewOptions?
    
    func initializeWMatrix(delegate: WMatrixProtocol, options: WebViewOptions) async {
        if self.wmatrix == nil {
            self.wmatrix = WMatrix(delegate: delegate)
            self.options = options
            
            let useServerSelectScreen:Bool = TargetInfo.getUseSeverSelect()
            if useServerSelectScreen {
                self.wmatrix?.showServerSelect()
                return
            }
            
            if let serverGroup = self.wmatrix?.getStartServerGroupFromConfig() {
                _ = await MainActor.run {
                    TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixGroupSelect(group: serverGroup))
                }
            }
        }
    }
    
    func create(group: ServerGroup) {
        group.serverList.forEach { serverData in
            self.wmatrix?.create(tag: serverData.name, serverData: serverData, webViewOptions: self.options ?? WebViewOptions())
        }
    }
    
    func start(tag: String) {
        self.wmatrix?.start(tag: tag)
    }
    
    func makeWebview(tag: String) {
        self.wmatrix?.makeWebView(tag: tag, async: true)
    }
   
}


