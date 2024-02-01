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
    init() {}
    
    var body: some View {
        WithViewStore(TemplateSwiftUIApp.matrixStore, observe: { $0 }) { viewStore in
              Text("webview")
        }
    }
}





