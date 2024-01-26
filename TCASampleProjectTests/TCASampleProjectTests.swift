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

}
