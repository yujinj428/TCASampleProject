//
//  TCASampleProjectTests.swift
//  TCASampleProjectTests
//
//  Created by 정유진 on 2024/01/26.
//

import ComposableArchitecture
import XCTest

@testable import TCASampleProject

@MainActor
final class TCASampleProjectTests: XCTestCase {

    func testCounter() async { // composable arch do make use of asynchrony
        let store = TestStore(initialState: Counter.State()) {
            Counter()
        }
        
        // teststore의 send는 async
        await store.send(.incrementButtonTapped) {
            $0.count = 1
        }
        await store.send(.decrementButtonTapped) {
            $0.count = 0
        }
    }
    
    func testTimer() async {
        let store = TestStore(initialState: Counter.State()) {
            Counter()
        }
        
        await store.send(.toggleTimerButtonTapped) {
          $0.isTimerRunning = true
        }
        // ❌ An effect returned for this action is still running.
        //    It must complete before the end of the test. …
        
        /*
         to assert that you expect to receive an action, and describe how state mutates upon receiving that action.
        */
        await store.receive(\.timerTick, timeout: .seconds(2)) { // keypath로 action을 받음
            $0.count = 1
        }
        
        await store.send(.toggleTimerButtonTapped) {
            $0.isTimerRunning = false
        }
    }

}
