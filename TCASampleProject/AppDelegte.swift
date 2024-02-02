//
//  AppDelegte.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/02/01.
//

import UIKit
import WMatrixMobile
import ComposableArchitecture

class AppDelegate: NSObject, UIApplicationDelegate, ObservableObject {
    
    @Published var webviews: [WMatrixWebView] = []
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
     
        Task {
            await MainActor.run {
                let webviewOptions = WebViewOptions() // webview 및 option 수정이 필요할 경우 여기서 set
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.initMatrix(delegate: self, options: webviewOptions))
            }
        }
        
        return true
    }
}

extension AppDelegate: WMatrixProtocol {
    func onMatrixCreated(tag: String) {
        Task {
            await MainActor.run {
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixCreated(tag: tag))
            }
        }
    }
    
    func onMatrixStarted(tag: String) {
        Task {
            await MainActor.run {
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixStarted(tag: tag))
            }
        }
    }
    
    func onMatrixWebViewCreated(tag: String, matrixWebView: WMatrixMobile.WMatrixWebView?) {

        if let webview = matrixWebView {
            self.webviews.append(webview)
            
            if #available(iOS 16.4, *) {
                webview.isInspectable = true
            }
            
            if let nativeCommonPlugin = webview.pluginObjects["NativeCommonPlugin"] as? NativeCommonPlugin {
              
            }
            
            
            webview.loadStartPage()
        }
          
    }
    
    func onMatrixGroupSelect(group: WMatrixMobile.ServerGroup) {
        Task {
            await MainActor.run {
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixGroupSelect(group: group))
            }
        }
    }
    
    func onDismissLoadingView() {
        Task {
            await MainActor.run {
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onDismissLoadingView)
            }
        }
    }
    
    func onMatrixError(tag: String, error: WMatrixMobile.MatrixError) {
        Task {
            await MainActor.run {
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixError(tag: tag, error: error))
            }
        }
    }
}
