#if 0
#elif defined(__arm64__) && __arm64__
// Generated by Apple Swift version 5.9 (swiftlang-5.9.0.128.108 clang-1500.0.40.1)
#ifndef WMATRIXMOBILE_SWIFT_H
#define WMATRIXMOBILE_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#if defined(__OBJC__)
#include <Foundation/Foundation.h>
#endif
#if defined(__cplusplus)
#include <cstdint>
#include <cstddef>
#include <cstdbool>
#include <cstring>
#include <stdlib.h>
#include <new>
#include <type_traits>
#else
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#include <string.h>
#endif
#if defined(__cplusplus)
#if defined(__arm64e__) && __has_include(<ptrauth.h>)
# include <ptrauth.h>
#else
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wreserved-macro-identifier"
# ifndef __ptrauth_swift_value_witness_function_pointer
#  define __ptrauth_swift_value_witness_function_pointer(x)
# endif
# ifndef __ptrauth_swift_class_method_pointer
#  define __ptrauth_swift_class_method_pointer(x)
# endif
#pragma clang diagnostic pop
#endif
#endif

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...) 
# endif
#endif
#if !defined(SWIFT_RUNTIME_NAME)
# if __has_attribute(objc_runtime_name)
#  define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
# else
#  define SWIFT_RUNTIME_NAME(X) 
# endif
#endif
#if !defined(SWIFT_COMPILE_NAME)
# if __has_attribute(swift_name)
#  define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
# else
#  define SWIFT_COMPILE_NAME(X) 
# endif
#endif
#if !defined(SWIFT_METHOD_FAMILY)
# if __has_attribute(objc_method_family)
#  define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
# else
#  define SWIFT_METHOD_FAMILY(X) 
# endif
#endif
#if !defined(SWIFT_NOESCAPE)
# if __has_attribute(noescape)
#  define SWIFT_NOESCAPE __attribute__((noescape))
# else
#  define SWIFT_NOESCAPE 
# endif
#endif
#if !defined(SWIFT_RELEASES_ARGUMENT)
# if __has_attribute(ns_consumed)
#  define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
# else
#  define SWIFT_RELEASES_ARGUMENT 
# endif
#endif
#if !defined(SWIFT_WARN_UNUSED_RESULT)
# if __has_attribute(warn_unused_result)
#  define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
# else
#  define SWIFT_WARN_UNUSED_RESULT 
# endif
#endif
#if !defined(SWIFT_NORETURN)
# if __has_attribute(noreturn)
#  define SWIFT_NORETURN __attribute__((noreturn))
# else
#  define SWIFT_NORETURN 
# endif
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA 
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA 
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA 
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif
#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif
#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER 
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility) 
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if !defined(SWIFT_DEPRECATED_OBJC)
# if __has_feature(attribute_diagnose_if_objc)
#  define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
# else
#  define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
# endif
#endif
#if defined(__OBJC__)
#if !defined(IBSegueAction)
# define IBSegueAction 
#endif
#endif
#if !defined(SWIFT_EXTERN)
# if defined(__cplusplus)
#  define SWIFT_EXTERN extern "C"
# else
#  define SWIFT_EXTERN extern
# endif
#endif
#if !defined(SWIFT_CALL)
# define SWIFT_CALL __attribute__((swiftcall))
#endif
#if !defined(SWIFT_INDIRECT_RESULT)
# define SWIFT_INDIRECT_RESULT __attribute__((swift_indirect_result))
#endif
#if !defined(SWIFT_CONTEXT)
# define SWIFT_CONTEXT __attribute__((swift_context))
#endif
#if !defined(SWIFT_ERROR_RESULT)
# define SWIFT_ERROR_RESULT __attribute__((swift_error_result))
#endif
#if defined(__cplusplus)
# define SWIFT_NOEXCEPT noexcept
#else
# define SWIFT_NOEXCEPT 
#endif
#if !defined(SWIFT_C_INLINE_THUNK)
# if __has_attribute(always_inline)
# if __has_attribute(nodebug)
#  define SWIFT_C_INLINE_THUNK inline __attribute__((always_inline)) __attribute__((nodebug))
# else
#  define SWIFT_C_INLINE_THUNK inline __attribute__((always_inline))
# endif
# else
#  define SWIFT_C_INLINE_THUNK inline
# endif
#endif
#if defined(_WIN32)
#if !defined(SWIFT_IMPORT_STDLIB_SYMBOL)
# define SWIFT_IMPORT_STDLIB_SYMBOL __declspec(dllimport)
#endif
#else
#if !defined(SWIFT_IMPORT_STDLIB_SYMBOL)
# define SWIFT_IMPORT_STDLIB_SYMBOL 
#endif
#endif
#if defined(__OBJC__)
#if __has_feature(objc_modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import CoreData;
@import CoreFoundation;
@import Foundation;
@import ObjectiveC;
@import UIKit;
@import WebKit;
#endif

#endif
#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"
#pragma clang diagnostic ignored "-Wdollar-in-identifier-extension"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="WMatrixMobile",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

#if defined(__OBJC__)
@class NSEntityDescription;
@class NSManagedObjectContext;

SWIFT_CLASS_NAMED("AssetHash")
@interface AssetHash : NSManagedObject
- (nonnull instancetype)initWithEntity:(NSEntityDescription * _Nonnull)entity insertIntoManagedObjectContext:(NSManagedObjectContext * _Nullable)context OBJC_DESIGNATED_INITIALIZER;
@end

@class NSString;

@interface AssetHash (SWIFT_EXTENSION(WMatrixMobile))
@property (nonatomic, copy) NSString * _Nullable appid;
@property (nonatomic, copy) NSString * _Nullable hashkey;
@property (nonatomic, copy) NSString * _Nullable path;
@property (nonatomic, copy) NSString * _Nullable server;
@end

@class WMatrix;
@class WMatrixWebView;
@class NSURL;
@class WMatrixPluginResult;

/// CommandDelegate 프로토콜 정의
/// date:
///
/// author:
///
/// <ul>
///   <li>
///     2021-04-22
///   </li>
///   <li>
///     jihoon jang
///   </li>
/// </ul>
SWIFT_PROTOCOL("_TtP13WMatrixMobile15CommandDelegate_")
@protocol CommandDelegate
@property (nonatomic, strong) WMatrix * _Nullable wmatrix;
@property (nonatomic, strong) WMatrixWebView * _Nullable webView;
@property (nonatomic, copy) NSURL * _Nonnull (^ _Nullable urlTransformer)(NSURL * _Nonnull);
- (id _Nonnull)getCommandInstance:(NSString * _Nonnull)pluginName SWIFT_WARN_UNUSED_RESULT;
- (void)send:(WMatrixPluginResult * _Nonnull)pluginResult callbackId:(NSString * _Nullable)callbackId;
- (void)evalJs:(NSString * _Nonnull)js;
- (void)run:(void (^ _Nonnull)(void))inBackground;
@end


SWIFT_CLASS_NAMED("CommandQueue")
@interface CommandQueue : NSObject
/// CommandQueue를 초기화한다. queue를 초기화하고 viewcontroller property를 초기화한다.
/// date:
///
/// author:
///
/// <ul>
///   <li>
///     2021-04-21
///   </li>
///   <li>
///     jihoon jang
///   </li>
/// </ul>
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

typedef SWIFT_ENUM(NSInteger, CommandStatus, open) {
  CommandStatusSUCCESS = 1000,
  CommandStatusINVALID_PARAM = 1100,
  CommandStatusNO_PERMISSION = 1200,
  CommandStatusTIME_OUT = 1300,
  CommandStatusNO_CONNECT = 1400,
  CommandStatusNETWORK_TIME_OUT = 1401,
  CommandStatusNETWORK_RESPONSE_ERROR = 1402,
  CommandStatusOBJECT_CREATION_FAILED = 1500,
  CommandStatusOBJECT_REFERENCE_FAILED = 1501,
  CommandStatusJSON_PARSING_FAILED = 1600,
  CommandStatusJSON_STRINGIFY_FAILED = 1601,
  CommandStatusFILE_NOT_FOUND = 1700,
  CommandStatusUNABLE_FILE_WRITE = 1701,
  CommandStatusUNABLE_FILE_READ = 1702,
  CommandStatusNO_MODIFICATION_ALLOWED = 1703,
  CommandStatusUNABLE_FILE_REMOVE = 1704,
  CommandStatusFAIL_TAKE_PICTURE = 1800,
  CommandStatusREFRESH_UPDATE_ERROR = 1900,
  CommandStatusNOT_USE_REFRESH_UPDATE_POLICY = 1901,
  CommandStatusNOT_DEFINED_ACTION = 2000,
  CommandStatusINVALID_PARAM_TYPE = 2001,
  CommandStatusEXCEPTION = 3000,
  CommandStatusUNKNOWN = 9999,
};


@class UIViewController;
@class NSNotification;

/// Objective-C에서 Swift Class를 상속받을 수 없어 Protocol로 대체 property와 method를 구현하면 WHybridPlugin과 같이 동작함.
/// date:
///
/// <ul>
///   <li>
///     2021-07-09
///   </li>
/// </ul>
/// author:
///
/// <ul>
///   <li>
///     changok89
///   </li>
/// </ul>
SWIFT_PROTOCOL("_TtP13WMatrixMobile21WMatrixPluginProtocol_")
@protocol WMatrixPluginProtocol
@property (nonatomic, strong) UIViewController * _Nullable viewController;
@property (nonatomic, strong) NSObject <CommandDelegate> * _Nullable commandDelegate;
@property (nonatomic, strong) WMatrixWebView * _Nullable webView;
@optional
- (void)pluginInitialize;
- (void)handleOpenURL:(NSNotification * _Nonnull)notification;
- (void)handleOpenURLWithApplicationSourceAndAnnotation:(NSNotification * _Nonnull)notification;
- (void)onReset;
- (void)onMemoryWarning;
- (void)onAppTerminate;
@end

@class WMatrixCommand;

SWIFT_CLASS("_TtC13WMatrixMobile17InAppUpdatePlugin")
@interface InAppUpdatePlugin : NSObject <WMatrixPluginProtocol>
@property (nonatomic, strong) WMatrixWebView * _Nullable webView;
@property (nonatomic, strong) NSObject <CommandDelegate> * _Nullable commandDelegate;
@property (nonatomic, strong) UIViewController * _Nullable viewController;
- (void)pluginInitialize;
/// refreshUpdate 재실행
/// \param command nil
///
- (void)checkRefreshUpdate:(WMatrixCommand * _Nonnull)command;
/// 서버선택화면 출력
/// \param command nil
///
- (void)showServerSelect:(WMatrixCommand * _Nonnull)command;
/// WMatrix 초기화
- (void)reset:(WMatrixCommand * _Nonnull)command;
/// network connection check
/// \param command nil
///
- (void)isOffline:(WMatrixCommand * _Nonnull)command;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@class GCDWebServer;

SWIFT_CLASS_NAMED("LocalWebServer")
@interface LocalWebServer : NSObject
@property (nonatomic, strong) GCDWebServer * _Nonnull server;
@property (nonatomic) NSInteger port;
@property (nonatomic, copy) NSString * _Nonnull remoteServer;
@property (nonatomic, copy) NSString * _Nonnull baseServer;
@property (nonatomic, copy) NSString * _Nonnull serverContext;
@property (nonatomic, copy) NSDictionary<NSString *, NSString *> * _Nonnull localResourceHeader;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
/// 로컬웹서버를 시작한다.
///
/// returns:
/// 시작여부
- (BOOL)start SWIFT_WARN_UNUSED_RESULT;
@end


SWIFT_CLASS("_TtC13WMatrixMobile13WMatrixPlugin")
@interface WMatrixPlugin : NSObject <WMatrixPluginProtocol>
@property (nonatomic, strong) WMatrixWebView * _Nullable webView;
@property (nonatomic, strong) UIViewController * _Nullable viewController;
@property (nonatomic, weak) NSObject <CommandDelegate> * _Nullable commandDelegate;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
- (void)pluginInitialize;
- (void)handleOpenURL:(NSNotification * _Nonnull)notification;
- (void)handleOpenURLWithApplicationSourceAndAnnotation:(NSNotification * _Nonnull)notification;
- (void)onAppTerminate;
- (void)onMemoryWarning;
- (void)onReset;
- (void)dispose;
@end


SWIFT_CLASS_NAMED("Logger")
@interface Logger : WMatrixPlugin
/// WebLog를 Native Log를 출력한다.
/// date:
///
/// author:
///
/// <ul>
///   <li>
///     Parameters :
///   </li>
///   <li>
///     command :출력할 Message
///   </li>
///   <li>
///     2021-07-09
///   </li>
///   <li>
///     changok89
///   </li>
/// </ul>
- (void)logLevel:(WMatrixCommand * _Nonnull)command;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end



SWIFT_CLASS_NAMED("RefreshHash")
@interface RefreshHash : NSManagedObject
- (nonnull instancetype)initWithEntity:(NSEntityDescription * _Nonnull)entity insertIntoManagedObjectContext:(NSManagedObjectContext * _Nullable)context OBJC_DESIGNATED_INITIALIZER;
@end


@interface RefreshHash (SWIFT_EXTENSION(WMatrixMobile))
@property (nonatomic, copy) NSString * _Nullable appid;
@property (nonatomic, copy) NSString * _Nullable hashkey;
@property (nonatomic, copy) NSString * _Nullable path;
@property (nonatomic, copy) NSString * _Nullable server;
@end

@class NSCoder;

SWIFT_CLASS("_TtC13WMatrixMobile14ServerEditView")
@interface ServerEditView : UIView
- (nonnull instancetype)initWithFrame:(CGRect)frame OBJC_DESIGNATED_INITIALIZER;
- (void)prepareForInterfaceBuilder;
- (void)layoutSubviews;
- (void)drawRect:(CGRect)rect;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)aDecoder SWIFT_UNAVAILABLE;
@end

@class UITextField;

@interface ServerEditView (SWIFT_EXTENSION(WMatrixMobile)) <UITextFieldDelegate>
- (BOOL)textFieldShouldReturn:(UITextField * _Nonnull)textField SWIFT_WARN_UNUSED_RESULT;
@end


SWIFT_PROTOCOL_NAMED("ServerSelectProtocol")
@protocol ServerSelectProtocol
- (void)onServerSelect;
@end


SWIFT_CLASS("_TtC13WMatrixMobile16ServerSelectView")
@interface ServerSelectView : UIView <UITextViewDelegate>
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)aDecoder SWIFT_UNAVAILABLE;
- (void)layoutSubviews;
- (void)drawRect:(CGRect)rect;
- (nonnull instancetype)initWithFrame:(CGRect)frame SWIFT_UNAVAILABLE;
@end

@class UITableView;
@class NSIndexPath;
@class UITableViewCell;

@interface ServerSelectView (SWIFT_EXTENSION(WMatrixMobile)) <UITableViewDataSource, UITableViewDelegate>
- (NSInteger)numberOfSectionsInTableView:(UITableView * _Nonnull)tableView SWIFT_WARN_UNUSED_RESULT;
/// section 갯수 반환
/// \param tableView tableview
///
/// \param section section
///
///
/// returns:
/// section 갯수
- (NSInteger)tableView:(UITableView * _Nonnull)tableView numberOfRowsInSection:(NSInteger)section SWIFT_WARN_UNUSED_RESULT;
/// ServerGroup row 생성
/// \param tableView tableview
///
/// \param indexPath index
///
///
/// returns:
/// row
- (UITableViewCell * _Nonnull)tableView:(UITableView * _Nonnull)tableView cellForRowAtIndexPath:(NSIndexPath * _Nonnull)indexPath SWIFT_WARN_UNUSED_RESULT;
- (BOOL)tableView:(UITableView * _Nonnull)tableView canEditRowAtIndexPath:(NSIndexPath * _Nonnull)indexPath SWIFT_WARN_UNUSED_RESULT;
/// 서버그룹 삭제
/// \param tableView tableView
///
/// \param editingStyle style
///
/// \param indexPath index
///
- (void)tableView:(UITableView * _Nonnull)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath * _Nonnull)indexPath;
/// section (GroupName) view 생성
/// \param tableView tableview
///
/// \param section section
///
///
/// returns:
/// section view
- (UIView * _Nullable)tableView:(UITableView * _Nonnull)tableView viewForHeaderInSection:(NSInteger)section SWIFT_WARN_UNUSED_RESULT;
/// section view height 값 적용
/// \param tableView tableview
///
/// \param section section
///
///
/// returns:
/// height
- (CGFloat)tableView:(UITableView * _Nonnull)tableView heightForHeaderInSection:(NSInteger)section SWIFT_WARN_UNUSED_RESULT;
/// TableView에 cell  터치시 선택
/// \param tableView tableview
///
/// \param indexPath index
///
- (void)tableView:(UITableView * _Nonnull)tableView didSelectRowAtIndexPath:(NSIndexPath * _Nonnull)indexPath;
/// TableView에 cell  터치시 선택취소
/// \param tableView tableview
///
/// \param indexPath index
///
- (void)tableView:(UITableView * _Nonnull)tableView didDeselectRowAtIndexPath:(NSIndexPath * _Nonnull)indexPath;
@end

@class NSURLSession;
@class NSURLSessionTask;
@class NSHTTPURLResponse;
@class NSURLRequest;

SWIFT_CLASS("_TtC13WMatrixMobile14SessionWrapper")
@interface SessionWrapper : NSObject <NSURLSessionDataDelegate>
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
- (void)URLSession:(NSURLSession * _Nonnull)session task:(NSURLSessionTask * _Nonnull)task willPerformHTTPRedirection:(NSHTTPURLResponse * _Nonnull)response newRequest:(NSURLRequest * _Nonnull)request completionHandler:(void (^ _Nonnull)(NSURLRequest * _Nullable))completionHandler;
@end


/// TableView에 사용할 TableViewCell 객체 style를 subtitle 적용한 class
SWIFT_CLASS("_TtC13WMatrixMobile21SubtitleTableViewCell")
@interface SubtitleTableViewCell : UITableViewCell
- (nonnull instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString * _Nullable)reuseIdentifier SWIFT_UNAVAILABLE;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)aDecoder SWIFT_UNAVAILABLE;
@end






SWIFT_CLASS_NAMED("UserResourceHash")
@interface UserResourceHash : NSManagedObject
- (nonnull instancetype)initWithEntity:(NSEntityDescription * _Nonnull)entity insertIntoManagedObjectContext:(NSManagedObjectContext * _Nullable)context OBJC_DESIGNATED_INITIALIZER;
@end


@interface UserResourceHash (SWIFT_EXTENSION(WMatrixMobile))
@property (nonatomic, copy) NSString * _Nullable appid;
@property (nonatomic, copy) NSString * _Nullable hashkey;
@property (nonatomic, copy) NSString * _Nullable path;
@property (nonatomic, copy) NSString * _Nullable server;
@end


SWIFT_CLASS("_TtC13WMatrixMobile7WMatrix")
@interface WMatrix : NSObject
@property (nonatomic, strong) UIViewController * _Nullable viewController;
@property (nonatomic, copy) NSDictionary<NSString *, NSString *> * _Nonnull pluginsMap;
@property (nonatomic, copy) NSArray<NSString *> * _Nonnull startupPluginNames;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
/// W-Matrix를 시작을 위한 설정을 하고 start한다.
/// \param tag 서버 tag
///
- (void)startWithTag:(NSString * _Nonnull)tag;
/// $h.dismissScreen시 호출되는 static function이라 Utility에 delegate를 추가하여 호출
+ (void)dismissScrean;
@end


SWIFT_CLASS("_TtC13WMatrixMobile14WMatrixCommand")
@interface WMatrixCommand : NSObject
@property (nonatomic, copy) NSArray * _Nullable arguments;
@property (nonatomic, readonly, copy) NSString * _Nullable callbackId;
@property (nonatomic, readonly, copy) NSString * _Nullable className;
@property (nonatomic, readonly, copy) NSString * _Nullable methodName;
@property (nonatomic, readonly, copy) NSString * _Nullable uuid;
- (nonnull instancetype)init:(NSArray * _Nullable)arguments callbackId:(NSString * _Nullable)callbackId className:(NSString * _Nullable)className methodName:(NSString * _Nullable)methodName uuid:(NSString * _Nullable)uuid OBJC_DESIGNATED_INITIALIZER;
- (void)massageArguments;
- (id _Nullable)argumentAt:(NSInteger)at SWIFT_WARN_UNUSED_RESULT;
- (id _Nullable)argumentAt:(NSInteger)at defaultValue:(id _Nullable)defaultValue SWIFT_WARN_UNUSED_RESULT;
- (id _Nullable)argumentAt:(NSInteger)at defaultValue:(id _Nullable)defaultValue aClass:(Class _Nullable)aClass SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end



@class NSData;

SWIFT_CLASS_NAMED("WMatrixPluginResult")
@interface WMatrixPluginResult : NSObject
- (nonnull instancetype)initWithStatus:(enum CommandStatus)status OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)initWithStatus:(enum CommandStatus)status message:(id _Nullable)message OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)initWithStatus:(NSInteger)status msg:(NSString * _Nonnull)msg OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)initWithStatus:(enum CommandStatus)status messageAs:(id _Nullable)messageAs OBJC_DESIGNATED_INITIALIZER;
+ (WMatrixPluginResult * _Nonnull)resultWithStatus:(id _Nullable)message SWIFT_WARN_UNUSED_RESULT;
+ (WMatrixPluginResult * _Nonnull)resultWithStatus:(enum CommandStatus)statusOrdinal message:(id _Nullable)message SWIFT_WARN_UNUSED_RESULT;
+ (WMatrixPluginResult * _Nonnull)resultWithStatus:(enum CommandStatus)statusOrdinal theMessage:(NSData * _Nullable)theMessage SWIFT_WARN_UNUSED_RESULT;
+ (WMatrixPluginResult * _Nonnull)resultWithStatus:(enum CommandStatus)statusOrdinal theMessages:(NSArray * _Nullable)theMessages uuid:(NSString * _Nonnull)uuid SWIFT_WARN_UNUSED_RESULT;
+ (WMatrixPluginResult * _Nonnull)resultWithStatus:(enum CommandStatus)statusOrdinal errorCode:(NSInteger)errorCode uuid:(NSString * _Nonnull)uuid SWIFT_WARN_UNUSED_RESULT;
- (void)setKeepCallbackAs:(BOOL)bKeepCallback;
+ (NSDictionary<NSString *, id> * _Nullable)massageMessage:(id _Nullable)message SWIFT_WARN_UNUSED_RESULT;
+ (NSDictionary<NSString *, id> * _Nonnull)messageFromArrayBuffer:(NSData * _Nonnull)data SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class WKWebViewConfiguration;

SWIFT_CLASS_NAMED("WMatrixWebView")
@interface WMatrixWebView : WKWebView
@property (nonatomic, strong) id <CommandDelegate> _Nullable commandDelegate;
@property (nonatomic, strong) CommandQueue * _Nullable commandQueue;
@property (nonatomic, copy) NSDictionary<NSString *, id> * _Nonnull pluginObjects;
@property (nonatomic, copy) NSDictionary<NSString *, NSString *> * _Nonnull pluginsMap;
@property (nonatomic, copy) NSArray<NSString *> * _Nonnull startupPluginNames;
@property (nonatomic, copy) NSString * _Nonnull webViewId;
@property (nonatomic, copy) NSString * _Nonnull tagName;
- (nonnull instancetype)initWithFrame:(CGRect)frame configuration:(WKWebViewConfiguration * _Nonnull)configuration SWIFT_UNAVAILABLE;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)coder SWIFT_UNAVAILABLE;
/// webView에 시작페이지를 로드시킨다.
/// \param header http request에 header 값
///
/// \param queryParameter get방식에 query parameter 값
///
- (void)loadStartPageWithPath:(NSString * _Nullable)path header:(NSDictionary<NSString *, NSString *> * _Nullable)header queryParameter:(NSDictionary<NSString *, NSString *> * _Nullable)queryParameter;
@end


@class WKUserContentController;
@class WKScriptMessage;

@interface WMatrixWebView (SWIFT_EXTENSION(WMatrixMobile)) <WKScriptMessageHandler>
- (void)userContentController:(WKUserContentController * _Nonnull)userContentController didReceiveScriptMessage:(WKScriptMessage * _Nonnull)message;
@end

@class UIGestureRecognizer;

@interface WMatrixWebView (SWIFT_EXTENSION(WMatrixMobile)) <UIGestureRecognizerDelegate>
- (BOOL)gestureRecognizer:(UIGestureRecognizer * _Nonnull)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer * _Nonnull)otherGestureRecognizer SWIFT_WARN_UNUSED_RESULT;
@end


@class WKFrameInfo;
@class WKNavigationAction;
@class WKWindowFeatures;

@interface WMatrixWebView (SWIFT_EXTENSION(WMatrixMobile)) <WKUIDelegate>
/// wkwebview에 window.alert() 발생시 동작을 실행한다. 여러개의 인자를 받아 alert를 출력한다.
/// date:
///
/// <ul>
///   <li>
///     2021-07-13
///   </li>
/// </ul>
/// author:
///
/// <ul>
///   <li>
///     changok89
///   </li>
/// </ul>
/// <ul>
///   <li>
///     Parameters :
///     <ul>
///       <li>
///         webView : wkwebview
///       </li>
///       <li>
///         message : alert로 출력할 메시지
///       </li>
///       <li>
///         frame : WKFrameInfo
///       </li>
///       <li>
///         completionHandler : 완료이벤트
///       </li>
///     </ul>
///   </li>
/// </ul>
- (void)webView:(WKWebView * _Nonnull)webView runJavaScriptAlertPanelWithMessage:(NSString * _Nonnull)message initiatedByFrame:(WKFrameInfo * _Nonnull)frame completionHandler:(void (^ _Nonnull)(void))completionHandler;
/// wkwebview에 window.confirm() 발생시 동작을 실행한다. 여러개의 인자를 받아 confirm창을 출력한다.
/// date:
///
/// <ul>
///   <li>
///     2021-07-13
///   </li>
/// </ul>
/// author:
///
/// <ul>
///   <li>
///     changok89
///   </li>
/// </ul>
/// <ul>
///   <li>
///     Parameters :
///     <ul>
///       <li>
///         webView : wkwebview
///       </li>
///       <li>
///         message : confirm으로 출력할 메시지
///       </li>
///       <li>
///         frame : WKFrameInfo
///       </li>
///       <li>
///         completionHandler : 완료이벤트 확인/취소에 따라 parameter값이
///       </li>
///     </ul>
///   </li>
/// </ul>
- (void)webView:(WKWebView * _Nonnull)webView runJavaScriptConfirmPanelWithMessage:(NSString * _Nonnull)message initiatedByFrame:(WKFrameInfo * _Nonnull)frame completionHandler:(void (^ _Nonnull)(BOOL))completionHandler;
/// wkwebview에 window.prompt() 발생시 동작을 실행한다. 여러개의 인자를 받아 prompt창을 출력한다.
/// date:
///
/// <ul>
///   <li>
///     2021-07-13
///   </li>
/// </ul>
/// author:
///
/// <ul>
///   <li>
///     changok89
///   </li>
/// </ul>
/// <ul>
///   <li>
///     Parameters :
///   </li>
///   <li>
///     webView : wkwebview
///     <ul>
///       <li>
///         message : prompt로 출력할 메시지
///       </li>
///       <li>
///         frame : WKFrameInfo
///       </li>
///       <li>
///         completionHandler : 완료이벤트 확인/취소에 따라 parameter값이
///       </li>
///     </ul>
///   </li>
/// </ul>
- (void)webView:(WKWebView * _Nonnull)webView runJavaScriptTextInputPanelWithPrompt:(NSString * _Nonnull)prompt defaultText:(NSString * _Nullable)defaultText initiatedByFrame:(WKFrameInfo * _Nonnull)frame completionHandler:(void (^ _Nonnull)(NSString * _Nullable))completionHandler;
/// wkwebview에 window.open() 발생시 새 웹뷰를 viewController에 추가한다. 브라우저에서 탭을 추가하는것과 같다.
/// date:
///
/// <ul>
///   <li>
///     2021-07-13
///   </li>
/// </ul>
/// author:
///
/// <ul>
///   <li>
///     changok89
///   </li>
/// </ul>
/// <ul>
///   <li>
///     Parameters :
///     <ul>
///       <li>
///         webView : wkwebview
///       </li>
///       <li>
///         configuration : wkwebview configuration
///       </li>
///       <li>
///         navigationAction : 페이지 이동 정보
///       </li>
///       <li>
///         windowFeatures :
///       </li>
///     </ul>
///   </li>
/// </ul>
///
/// returns:
///
/// wkwebview
- (WKWebView * _Nullable)webView:(WKWebView * _Nonnull)webView createWebViewWithConfiguration:(WKWebViewConfiguration * _Nonnull)configuration forNavigationAction:(WKNavigationAction * _Nonnull)navigationAction windowFeatures:(WKWindowFeatures * _Nonnull)windowFeatures SWIFT_WARN_UNUSED_RESULT;
/// wkwebview에 window.close() 발생시 추가한 웹뷰를 닫는다. 브라우저에서 탭을 닫는것과 같다.
/// date:
///
/// <ul>
///   <li>
///     2021-07-13
///   </li>
/// </ul>
/// author:
///
/// <ul>
///   <li>
///     changok89
///   </li>
/// </ul>
/// \param webView wkwebview
///
- (void)webViewDidClose:(WKWebView * _Nonnull)webView;
@end

@class WKNavigation;

@interface WMatrixWebView (SWIFT_EXTENSION(WMatrixMobile)) <WKNavigationDelegate>
- (void)webView:(WKWebView * _Nonnull)webView didStartProvisionalNavigation:(WKNavigation * _Null_unspecified)navigation;
- (void)webView:(WKWebView * _Nonnull)webView didFinishNavigation:(WKNavigation * _Null_unspecified)navigation;
- (void)webView:(WKWebView * _Nonnull)webView didFailProvisionalNavigation:(WKNavigation * _Null_unspecified)navigation withError:(NSError * _Nonnull)error;
- (void)webView:(WKWebView * _Nonnull)webView didFailNavigation:(WKNavigation * _Null_unspecified)navigation withError:(NSError * _Nonnull)error;
- (void)webViewWebContentProcessDidTerminate:(WKWebView * _Nonnull)webView;
- (void)webView:(WKWebView * _Nonnull)webView decidePolicyForNavigationAction:(WKNavigationAction * _Nonnull)navigationAction decisionHandler:(void (^ _Nonnull)(WKNavigationActionPolicy))decisionHandler;
- (void)dispose;
@end


SWIFT_PROTOCOL("_TtP13WMatrixMobile20WebViewEventProtocol_")
@protocol WebViewEventProtocol
@optional
- (void)onDismiss;
@end

#endif
#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#if defined(__cplusplus)
#endif
#pragma clang diagnostic pop
#endif

#else
#error unsupported Swift architecture
#endif
