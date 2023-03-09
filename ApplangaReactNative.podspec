#
require 'json'
package = JSON.parse(File.read(File.expand_path('package.json', __dir__)))
version = package['version']

Pod::Spec.new do |s|
  s.name                = 'ApplangaReactNative'
  s.version             = package['version']
  s.summary             = package['description']
  s.description         = package['description']
  s.homepage            = package['homepage']
  s.license             = package['license']
  s.author              = package['author']
  s.platforms           = { :ios => "9.0", :tvos => "9.2" }
  s.source              = {:git => 'https://github.com/applanga/sdk-ios' }#:git => "http://EXAMPLE/applanga-react-native.git", :tag => "#{s.version}" }
  
  s.source_files        = 'ios/ApplangaReactNative/**/*.{h,m}'
  s.public_header_files = 'ios/ApplangaReactNative/*.h'
  s.preserve_paths = 'ios/ApplangaReactNative/**/*.{h,m}', 'README.md', 'LICENSE', 'package.json', '*.js'
  #s.preserve_paths      = 'README.md', 'LICENSE', 'package.json', '*.js'
  #s.ios.xcconfig = {
  #  'HEADER_SEARCH_PATHS' => '"${PODS_ROOT}/Applanga/Applanga.framework/**"'
  #}

  #s.dependency 'React'
  s.dependency 'Applanga'
  s.dependency 'React'
end
