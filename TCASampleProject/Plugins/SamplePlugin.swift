//
//  Copyright (C) Inswave Systems, Inc - All Rights Reserved
//  Unauthorized copying of this file, via any medium is strictly prohibited
//  Proprietary and confidential
//  Written by Inswave Systems <webmaster@inswave.com>, April 2021
//

import Foundation
import WMatrixMobile

class SamplePlugin : WMatrixPlugin {
    func echo(_ args:WMatrixCommand) {
        self.commandDelegate?.run { [weak self] in
            guard let weakSelf = self else { return }
            
            var result:WMatrixPluginResult = WMatrixPluginResult.init(status: .SUCCESS)
            if let param = args.argument(at: 0) {
                result = WMatrixPluginResult.init(status: .SUCCESS, message: param)
            } else {
                result = WMatrixPluginResult.init(status: .INVALID_PARAM)
            }
            weakSelf.commandDelegate?.send(result, callbackId: args.callbackId)
        }
    }
}
