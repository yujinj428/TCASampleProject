//
//  TemplateSwiftUIApp.swift
//  TemplateSwiftUI
//
//  Created by UAPMobile Team on 2021/12/29.
//

import SwiftUI
import ComposableArchitecture

@main
struct TemplateSwiftUIApp: App {
    @Environment(\.scenePhase) var scenePhase
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    static let matrixStore = Store(initialState: WMatrixState.State()){
        WMatrixState()
            ._printChanges()
    }
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appDelegate)
        }
    }
}

