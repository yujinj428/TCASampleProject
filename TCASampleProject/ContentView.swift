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
            
            ForEach(appDelegate.webviews, id: \.self) { webview in
                WMWebView(webView: webview)
            }
                
            if viewStore.showLoadingView {
                LoadingView(image: Image("logo"))
                    .alert("", isPresented: .constant(viewStore.isError)) {
                        Button("확인") { exit(0) }
                    } message: {
                        Text("code:\(viewStore.errorCode)\nmessage:\(viewStore.errorMessage)" )
                    }
            }
            
        }
        .onReceive(appDelegate.$webviews, perform: { value in
            print("I received a webview")
        })
            
    }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
