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
    var initWMatrix: @Sendable (WMatrixProtocol) async -> Void
    var createWMatrix: @Sendable (ServerGroup) async -> Void
    var startWMatrix: @Sendable (String) async -> Void
    var makeWebView: @Sendable (String) async -> Void
}

extension WMatrixClient: DependencyKey {
    static var liveValue: Self {
        let manager = WMatrixManager()
        return Self(
            initWMatrix: { delegate in
            await manager.inject(wmatrixDelegate: delegate)
        }, createWMatrix: { group in
            await manager.create(group: group)
        }, startWMatrix: { tag in
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
    private var serverGroup: [String] = []
    private var startGroup: [String] = []
    private var makeGroup: [String] = []
    
    func inject(wmatrixDelegate: WMatrixProtocol) {
        if self.wmatrix == nil {
            self.wmatrix = WMatrix(delegate: wmatrixDelegate)
            
            let useServerSelectScreen:Bool = TargetInfo.getUseSeverSelect()
            if useServerSelectScreen {
                self.wmatrix?.showServerSelect()
                return
            }
            
            if let serverGroup = self.wmatrix?.getStartServerGroupFromConfig() {
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixGroupSelect(group: serverGroup))
            }
        }
    }
    
    func create(group: ServerGroup) {
        if !self.serverGroup.contains(group.groupName) {
            self.serverGroup.append(group.groupName)
            group.serverList.forEach { serverData in
                let options = WebViewOptions()
                self.wmatrix?.create(tag: serverData.name, serverData: serverData, webViewOptions: options)
            }
        }
    }
    
    func start(tag: String) {
        if !self.startGroup.contains(tag) {
            self.startGroup.append(tag)
            self.wmatrix?.start(tag: tag)
        }
    }
    
    func makeWebview(tag: String) {
        if !self.makeGroup.contains(tag) {
            self.makeGroup.append(tag)
            self.wmatrix?.makeWebView(tag: tag, async: true)
        }
    }
    
    func inject(webview: WMatrixWebView) {
        if !self.webviews.contains(webview) {
            self.webviews.append(webview)
        }
    }
}


