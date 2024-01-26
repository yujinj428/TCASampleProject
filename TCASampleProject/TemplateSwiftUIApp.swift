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
    static let store = Store(initialState: Counter.State()) {
        Counter()
            ._printChanges()
      }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

