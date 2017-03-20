//
//  MyCustomModule.h
//  reactNativeDemo
//
//  Created by leonardo on 2017/3/18.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"
@interface MyCustomModule : NSObject <RCTBridgeModule>
@end

@implementation MyCustomModule

RCT_EXPORT_MODULE();

// Available as NativeModules.MyCustomModule.processString
RCT_EXPORT_METHOD(processString:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  callback(@[[input stringByReplacingOccurrencesOfString:@"Goodbye" withString:@"Hello"]]);
}
@end
