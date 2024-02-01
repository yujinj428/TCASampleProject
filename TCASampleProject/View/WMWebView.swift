//
//  WMatrixWebView.swift.swift
//  TemplateSwiftUI
//
//  Created by UAPMobile Team on 2021/12/30.
//

import SwiftUI
import WebKit
import WMatrixMobile

struct WMWebView: UIViewRepresentable {
    
    var webView:WMatrixWebView
    
    func makeUIView(context: Context) -> WMatrixWebView {
        return self.webView
    }
    
    func updateUIView(_ webview: WMatrixWebView, context: UIViewRepresentableContext<WMWebView>) {
        
    }
}
