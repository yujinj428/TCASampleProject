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
//    @StateObject var matrixVM: MatrixViewModel = MatrixViewModel()
    @State var store = Store(initialState: WMatrixState.State(id: UUID())){
        WMatrixState()
            ._printChanges()
    }
    
    var body: some View {
        WithViewStore(self.store, observe: { $0 }) { viewStore in
        ZStack {
           
            ComposableWebView(store: self.store)
            
            if viewStore.showLoadingView {
                LoadingView(image: Image("logo"))
                    .alert("", isPresented: .constant(viewStore.isError)) {
                        Button("확인") { exit(0) }
                    } message: {
                        Text("code:\(viewStore.errorCode)\nmessage:\(viewStore.errorMessage)" )
                    }
            }
            
        }
    }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
