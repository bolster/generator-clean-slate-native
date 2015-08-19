/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSURL *jsCodeLocation;

  // -- Simulator
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8080/index.ios.bundle"];

  // -- Run on device...replace localhost with IP, must also change IP in RCTWebSocketExecutor.m
  //jsCodeLocation = [NSURL URLWithString:@"http://10.1.100.19:8080/index.ios.bundle"];

  // -- Bundled
  // While running `NODE_ENV=production npm run start`, run `curl 'http://localhost:8080/index.ios.bundle?dev=false&minify=true' -o iOS/main.jsbundle`
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"<%= projectName %>"
                                                   launchOptions:launchOptions];

  // Pass your initial state to the topmost view component
  rootView.initialProperties = @{};

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
