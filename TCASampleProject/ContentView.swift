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
    @StateObject var matrixVM: MatrixViewModel = MatrixViewModel()
    @State var store = Store(initialState: WMatrixState.State()){
        WMatrixState()
            ._printChanges()
    }
    
    
    var body: some View {
        ZStack {
            
            if matrixVM.model.showLoading {
                LoadingView(image: Image("logo"))
                    .alert("", isPresented:$matrixVM.model.error) {
                        Button("확인") { exit(0) }
                    } message: {
                        Text("code:\(matrixVM.model.errorCode)\nmessage:\(matrixVM.model.errorMessage)" )
                    }
            } else {
//                ForEach(matrixVM.webViews, id:\.self) { webView in
//                    WMWebView(webView: webView)
//                        .ignoresSafeArea(.keyboard)
//                }
                
            }
            
            CounterView(store: TemplateSwiftUIApp.store)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
