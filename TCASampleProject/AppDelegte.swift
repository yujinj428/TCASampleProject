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
                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.initMatrix(delegate: self))
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
        Task {
            await MainActor.run {
//                TemplateSwiftUIApp.matrixStore.send(WMatrixState.Action.onMatrixWebViewCreated(tag: tag, matrixWebView: matrixWebView)) // 이렇게 웹뷰를 넘기니까 crash 나요
                if let webview = matrixWebView {
                    self.webviews.append(webview)
                    webview.loadStartPage()
                }
            }
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
