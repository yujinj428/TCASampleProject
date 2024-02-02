//
//  NativeCommonPlugin.swift
//  TCASampleProject
//
//  Created by 정유진 on 2024/02/02.
//

import Foundation
import WMatrixMobile
import ComposableArchitecture


@DependencyClient
struct NativeCommonClient {
    var sendSuccess: @Sendable (String, Any?) async -> Void
    var sendError: @Sendable (String, [String: Any?]) -> Void
}

extension NativeCommonClient: DependencyKey {
    static var liveValue: Self {
        return Self(
            sendSuccess: { _, _ in
                
            },
            sendError: { _, _ in
                
            }
        )
    }
}

extension DependencyValues {
    var nativeCommonClient: NativeCommonClient {
        get { self[NativeCommonClient.self] }
        set { self[NativeCommonClient.self] = newValue }
    }
}

class NativeCommonPlugin: WMatrixPlugin {
    
    override func pluginInitialize() {
        print("native common init")
    }
}


