//
//  ContentView.swift
//  TemplateSwiftUI
//
//  Created by UAPMobile Team on 2021/12/29.
//

import SwiftUI
import WMatrixMobile
import ComposableArchitecture

struct ContentView: View {
    @Environment(\.scenePhase) var scenePhase
    @EnvironmentObject var appDelegate: AppDelegate // Access the AppDelegate as an environment object
    
    var body: some View {
        WithViewStore(TemplateSwiftUIApp.matrixStore, observe: { $0 }) { viewStore in
            
            ZStack {
    
                if appDelegate.webviews.count > 0 {
                    ForEach(appDelegate.webviews, id: \.self) { webview in
                        WMWebView(webView: webview)
                    }
                }
                    
                if viewStore.showLoadingView {
                    LoadingView(image: Image("logo"))
                        .alert(viewStore.alert?.title ?? "", isPresented: .constant(viewStore.matrixPhase == .error)) {
                            Button("확인") { exit(0) }
                        } message: {
                            Text(viewStore.alert?.message ?? "")
                        }
                }
                
            }
            
        } // viewStore block end
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
