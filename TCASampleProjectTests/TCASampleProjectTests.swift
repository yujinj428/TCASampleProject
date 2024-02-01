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

    func test() async { // composable arch do make use of asynchrony
        let store = TestStore(initialState: WMatrixState.State()) {
            WMatrixState()
        }
        
        // teststore의 send는 async
        await store.send(.onDismissLoadingView) {
            
        }
      
    }
    
  

}
