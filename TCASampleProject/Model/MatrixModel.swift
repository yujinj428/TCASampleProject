//
//  MatrixModel.swift
//  SwiftUISampleProject
//
//  Created by 김창옥 on 2023/02/17.
//

import Foundation
import Combine
import WMatrixMobile

struct MatrixModel {
    var create:Bool = false
    var start:Bool = false
    var isWebView:Bool = false
    
    var showLoading:Bool = true
    
    var error:Bool = false
    var errorCode:String = ""
    var errorMessage:String = ""
}
