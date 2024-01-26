//
//  MatrixViewModel.swift
//  SwiftUISampleProject
//
//  Created by 김창옥 on 2023/02/17.
//

import Foundation
import Combine
import WMatrixMobile
import UIKit
import SwiftUI

class MatrixViewModel: ObservableObject {
    @Published var model:MatrixModel = MatrixModel()
    @Published var webViews:[WMatrixWebView] = [WMatrixWebView]()
    
    var wmatrix:WMatrix?
    
    var length:Int = 0
    var temp:[WMatrixWebView] = [WMatrixWebView]()
    
    init(){
        self.wmatrix = WMatrix(delegate: self)
        self.showServerSelect()
    }
    
    func showServerSelect() {
        let useServerSelectScreen:Bool = TargetInfo.getUseSeverSelect()
        if useServerSelectScreen {
            self.wmatrix?.showServerSelect()
        } else {
            // 서버선택화면 미사용시
            // WMatrixConfig.plist에 target이름과 일치하는 Dictionary에 startServerGroup과 일치하는 serverGroup으로 시작한다.
            if let serverGroup = self.wmatrix?.getStartServerGroupFromConfig() {
                WMLog.debug(msg: "groupName:\(serverGroup.groupName), serverList:\(serverGroup.serverList)")
                self.createWMatrix(serverGroup:serverGroup)
            } else {
                WMLog.debug(msg: "WMatrixConfig.plist에 startServerGroup이름을 확인하세요.")
            }
        }
    }
    
    func createWMatrix(serverGroup: ServerGroup) {
        self.length += 1
        serverGroup.serverList.forEach { serverData in
            let options = WebViewOptions()
            self.wmatrix?.create(tag: serverData.name, serverData: serverData, webViewOptions: options)
        }
    }
}

extension MatrixViewModel: WMatrixProtocol {
    func onMatrixCreated(tag: String) {
        DispatchQueue.main.async {
            self.model.create = true
            self.wmatrix?.start(tag: tag)
        }
        
    }
    
    func onMatrixStarted(tag: String) {
        DispatchQueue.main.async {
            self.model.start = true
            self.wmatrix?.makeWebView(tag: tag)
        }
    }
    
    func onMatrixWebViewCreated(tag: String, matrixWebView: WMatrixMobile.WMatrixWebView?) {
        DispatchQueue.main.async {
            if let webView = matrixWebView {
                /// web inspector on
//                if #available(iOS 16.4, *) {
//                    webView.isInspectable = true
//                }
                
                self.temp.append(webView)
                if self.length == self.temp.count {
                    for v in self.temp {
                        v.loadStartPage()
                    }
                    self.model.isWebView = true
                    self.webViews.append(contentsOf: self.temp)
                }
            }
        }
    }
    
    func onMatrixGroupSelect(group: WMatrixMobile.ServerGroup) {
        self.createWMatrix(serverGroup: group)
    }
    
    func onDismissLoadingView() {
        withAnimation(.easeIn(duration: 0.5)) {
            self.model.showLoading.toggle()
        }
    }
    
    func onMatrixError(tag: String, error: WMatrixMobile.MatrixError) {
        DispatchQueue.main.async {
            self.model.error = true
            self.model.errorCode = error.errorCode
            self.model.errorMessage = error.errorMessage
        }
    }
}
