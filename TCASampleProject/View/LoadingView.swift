//
//  InAppUpdateView.swift
//  TemplateSwiftUI
//
//  Created by UAPMobile Team on 2021/12/31.
//

import Foundation
import SwiftUI
import WMatrixMobile


struct LoadingView: View {

    var image: Image
    var body: some View {
        ZStack {
            VStack {
                image.padding()
                
                LottieView(filename: "splash_loader")
                    .fixedSize()
            }
        }
        
    }
}

struct LoadingView_Previews: PreviewProvider {
    static var previews: some View {
        LoadingView(image: Image("logo"))
    }
}
