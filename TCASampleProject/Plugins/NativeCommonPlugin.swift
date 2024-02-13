//
//  NativeCommonPlugin.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/02/02.
//

import Foundation
import WMatrixMobile
import ComposableArchitecture


class NativeCommonPlugin: WMatrixPlugin {
    
    override func pluginInitialize() {
        print("native common init")
    }
    
    func sendSuccessCallback() {
        print("success callback")
    }
}



