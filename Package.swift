// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "ApplangaReactNative",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "ApplangaReactNative", targets: ["ApplangaReactNative"]),
    ],
    dependencies: [
        .package(url: "https://github.com/applanga/sdk-ios", exact: "2.0.228"),
    ],
    targets: [
        .target(
            name: "ApplangaReactNative",
            dependencies: [
                .product(name: "Applanga", package: "sdk-ios"),
            ],
            path: ".",
            exclude: [
                "android",
                "BasicExampleApp",
                "I18NextExample",
                "TurboModuleExampleApp",
                "gradle",
            ],
            sources: [
                "ios/ApplangaReactNative/ApplangaReactNative.h",
                "ios/ApplangaReactNative/ApplangaReactNative.mm",
            ],
            publicHeadersPath: "ios/ApplangaReactNative",
            cSettings: [.headerSearchPath("ios/ApplangaReactNative"), .headerSearchPath("."), .unsafeFlags(["-include", "react-native-spm-prefix.h"])],
            cxxSettings: [.headerSearchPath("ios/ApplangaReactNative"), .headerSearchPath("."), .unsafeFlags(["-include", "react-native-spm-prefix.h"]), .define("DEBUG", .when(configuration: .debug)), .define("NDEBUG", .when(configuration: .release))],
            linkerSettings: [.linkedFramework("UIKit"), .linkedFramework("Foundation"), .linkedFramework("CoreGraphics")]
        ),
    ],
    cxxLanguageStandard: .cxx20
)
