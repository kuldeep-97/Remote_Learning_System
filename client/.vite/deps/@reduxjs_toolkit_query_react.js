import {
  Provider_default,
  ReactReduxContext,
  batch,
  shallowEqual,
  useDispatch,
  useSelector,
  useStore
} from "./chunk-AQS3VJQW.js";
import {
  NamedSchemaError,
  QueryStatus,
  _NEVER,
  buildCreateApi,
  copyWithStructuralSharing,
  coreModule,
  coreModuleName,
  defaultSerializeQueryArgs,
  fakeBaseQuery,
  fetchBaseQuery,
  retry,
  setupListeners,
  skipToken
} from "./chunk-RXCX4CPM.js";
import {
  configureStore,
  createSelector
} from "./chunk-CEOPEO2M.js";
import {
  require_react
} from "./chunk-TXWKGKUG.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_react(), 1);
var React = __toESM(require_react(), 1);
function capitalize(str) {
  return str.replace(str[0], str[0].toUpperCase());
}
function countObjectKeys(obj) {
  let count = 0;
  for (const _key in obj) {
    count++;
  }
  return count;
}
function isQueryDefinition(e) {
  return e.type === "query";
}
function isMutationDefinition(e) {
  return e.type === "mutation";
}
function isInfiniteQueryDefinition(e) {
  return e.type === "infinitequery";
}
function safeAssign(target, ...args) {
  return Object.assign(target, ...args);
}
var UNINITIALIZED_VALUE = Symbol();
function useStableQueryArgs(queryArgs, serialize, endpointDefinition, endpointName) {
  const incoming = (0, import_react2.useMemo)(() => ({
    queryArgs,
    serialized: typeof queryArgs == "object" ? serialize({
      queryArgs,
      endpointDefinition,
      endpointName
    }) : queryArgs
  }), [queryArgs, serialize, endpointDefinition, endpointName]);
  const cache = (0, import_react2.useRef)(incoming);
  (0, import_react2.useEffect)(() => {
    if (cache.current.serialized !== incoming.serialized) {
      cache.current = incoming;
    }
  }, [incoming]);
  return cache.current.serialized === incoming.serialized ? cache.current.queryArgs : queryArgs;
}
function useShallowStableValue(value) {
  const cache = (0, import_react3.useRef)(value);
  (0, import_react3.useEffect)(() => {
    if (!shallowEqual(cache.current, value)) {
      cache.current = value;
    }
  }, [value]);
  return shallowEqual(cache.current, value) ? cache.current : value;
}
var canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = canUseDOM();
var isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = isRunningInReactNative();
var getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? import_react.useLayoutEffect : import_react.useEffect;
var useIsomorphicLayoutEffect = getUseIsomorphicLayoutEffect();
var noPendingQueryStateSelector = (selected) => {
  if (selected.isUninitialized) {
    return {
      ...selected,
      isUninitialized: false,
      isFetching: true,
      isLoading: selected.data !== void 0 ? false : true,
      status: QueryStatus.pending
    };
  }
  return selected;
};
function pick(obj, ...keys) {
  const ret = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}
var COMMON_HOOK_DEBUG_FIELDS = ["data", "status", "isLoading", "isSuccess", "isError", "error"];
function buildHooks({
  api,
  moduleOptions: {
    batch: batch2,
    hooks: {
      useDispatch: useDispatch2,
      useSelector: useSelector2,
      useStore: useStore2
    },
    unstable__sideEffectsInRender,
    createSelector: createSelector2
  },
  serializeQueryArgs,
  context
}) {
  const usePossiblyImmediateEffect = unstable__sideEffectsInRender ? (cb) => cb() : import_react.useEffect;
  return {
    buildQueryHooks,
    buildInfiniteQueryHooks,
    buildMutationHook,
    usePrefetch
  };
  function queryStatePreSelector(currentState, lastResult, queryArgs) {
    if ((lastResult == null ? void 0 : lastResult.endpointName) && currentState.isUninitialized) {
      const {
        endpointName
      } = lastResult;
      const endpointDefinition = context.endpointDefinitions[endpointName];
      if (queryArgs !== skipToken && serializeQueryArgs({
        queryArgs: lastResult.originalArgs,
        endpointDefinition,
        endpointName
      }) === serializeQueryArgs({
        queryArgs,
        endpointDefinition,
        endpointName
      })) lastResult = void 0;
    }
    let data = currentState.isSuccess ? currentState.data : lastResult == null ? void 0 : lastResult.data;
    if (data === void 0) data = currentState.data;
    const hasData = data !== void 0;
    const isFetching = currentState.isLoading;
    const isLoading = (!lastResult || lastResult.isLoading || lastResult.isUninitialized) && !hasData && isFetching;
    const isSuccess = currentState.isSuccess || hasData && (isFetching && !(lastResult == null ? void 0 : lastResult.isError) || currentState.isUninitialized);
    return {
      ...currentState,
      data,
      currentData: currentState.data,
      isFetching,
      isLoading,
      isSuccess
    };
  }
  function infiniteQueryStatePreSelector(currentState, lastResult, queryArgs) {
    if ((lastResult == null ? void 0 : lastResult.endpointName) && currentState.isUninitialized) {
      const {
        endpointName
      } = lastResult;
      const endpointDefinition = context.endpointDefinitions[endpointName];
      if (queryArgs !== skipToken && serializeQueryArgs({
        queryArgs: lastResult.originalArgs,
        endpointDefinition,
        endpointName
      }) === serializeQueryArgs({
        queryArgs,
        endpointDefinition,
        endpointName
      })) lastResult = void 0;
    }
    let data = currentState.isSuccess ? currentState.data : lastResult == null ? void 0 : lastResult.data;
    if (data === void 0) data = currentState.data;
    const hasData = data !== void 0;
    const isFetching = currentState.isLoading;
    const isLoading = (!lastResult || lastResult.isLoading || lastResult.isUninitialized) && !hasData && isFetching;
    const isSuccess = currentState.isSuccess || isFetching && hasData;
    return {
      ...currentState,
      data,
      currentData: currentState.data,
      isFetching,
      isLoading,
      isSuccess
    };
  }
  function usePrefetch(endpointName, defaultOptions) {
    const dispatch = useDispatch2();
    const stableDefaultOptions = useShallowStableValue(defaultOptions);
    return (0, import_react.useCallback)((arg, options) => dispatch(api.util.prefetch(endpointName, arg, {
      ...stableDefaultOptions,
      ...options
    })), [endpointName, dispatch, stableDefaultOptions]);
  }
  function useQuerySubscriptionCommonImpl(endpointName, arg, {
    refetchOnReconnect,
    refetchOnFocus,
    refetchOnMountOrArgChange,
    skip = false,
    pollingInterval = 0,
    skipPollingIfUnfocused = false,
    ...rest
  } = {}) {
    const {
      initiate
    } = api.endpoints[endpointName];
    const dispatch = useDispatch2();
    const subscriptionSelectorsRef = (0, import_react.useRef)(void 0);
    if (!subscriptionSelectorsRef.current) {
      const returnedValue = dispatch(api.internalActions.internal_getRTKQSubscriptions());
      if (true) {
        if (typeof returnedValue !== "object" || typeof (returnedValue == null ? void 0 : returnedValue.type) === "string") {
          throw new Error(false ? formatProdErrorMessage(37) : `Warning: Middleware for RTK-Query API at reducerPath "${api.reducerPath}" has not been added to the store.
    You must add the middleware for RTK-Query to function correctly!`);
        }
      }
      subscriptionSelectorsRef.current = returnedValue;
    }
    const stableArg = useStableQueryArgs(
      skip ? skipToken : arg,
      // Even if the user provided a per-endpoint `serializeQueryArgs` with
      // a consistent return value, _here_ we want to use the default behavior
      // so we can tell if _anything_ actually changed. Otherwise, we can end up
      // with a case where the query args did change but the serialization doesn't,
      // and then we never try to initiate a refetch.
      defaultSerializeQueryArgs,
      context.endpointDefinitions[endpointName],
      endpointName
    );
    const stableSubscriptionOptions = useShallowStableValue({
      refetchOnReconnect,
      refetchOnFocus,
      pollingInterval,
      skipPollingIfUnfocused
    });
    const initialPageParam = rest.initialPageParam;
    const stableInitialPageParam = useShallowStableValue(initialPageParam);
    const promiseRef = (0, import_react.useRef)(void 0);
    let {
      queryCacheKey,
      requestId
    } = promiseRef.current || {};
    let currentRenderHasSubscription = false;
    if (queryCacheKey && requestId) {
      currentRenderHasSubscription = subscriptionSelectorsRef.current.isRequestSubscribed(queryCacheKey, requestId);
    }
    const subscriptionRemoved = !currentRenderHasSubscription && promiseRef.current !== void 0;
    usePossiblyImmediateEffect(() => {
      if (subscriptionRemoved) {
        promiseRef.current = void 0;
      }
    }, [subscriptionRemoved]);
    usePossiblyImmediateEffect(() => {
      var _a;
      const lastPromise = promiseRef.current;
      if (typeof process !== "undefined" && false) {
        console.log(subscriptionRemoved);
      }
      if (stableArg === skipToken) {
        lastPromise == null ? void 0 : lastPromise.unsubscribe();
        promiseRef.current = void 0;
        return;
      }
      const lastSubscriptionOptions = (_a = promiseRef.current) == null ? void 0 : _a.subscriptionOptions;
      if (!lastPromise || lastPromise.arg !== stableArg) {
        lastPromise == null ? void 0 : lastPromise.unsubscribe();
        const promise = dispatch(initiate(stableArg, {
          subscriptionOptions: stableSubscriptionOptions,
          forceRefetch: refetchOnMountOrArgChange,
          ...isInfiniteQueryDefinition(context.endpointDefinitions[endpointName]) ? {
            initialPageParam: stableInitialPageParam
          } : {}
        }));
        promiseRef.current = promise;
      } else if (stableSubscriptionOptions !== lastSubscriptionOptions) {
        lastPromise.updateSubscriptionOptions(stableSubscriptionOptions);
      }
    }, [dispatch, initiate, refetchOnMountOrArgChange, stableArg, stableSubscriptionOptions, subscriptionRemoved, stableInitialPageParam, endpointName]);
    return [promiseRef, dispatch, initiate, stableSubscriptionOptions];
  }
  function buildUseQueryState(endpointName, preSelector) {
    const useQueryState = (arg, {
      skip = false,
      selectFromResult
    } = {}) => {
      const {
        select
      } = api.endpoints[endpointName];
      const stableArg = useStableQueryArgs(skip ? skipToken : arg, serializeQueryArgs, context.endpointDefinitions[endpointName], endpointName);
      const lastValue = (0, import_react.useRef)(void 0);
      const selectDefaultResult = (0, import_react.useMemo)(() => (
        // Normally ts-ignores are bad and should be avoided, but we're
        // already casting this selector to be `Selector<any>` anyway,
        // so the inconsistencies don't matter here
        // @ts-ignore
        createSelector2([
          // @ts-ignore
          select(stableArg),
          (_, lastResult) => lastResult,
          (_) => stableArg
        ], preSelector, {
          memoizeOptions: {
            resultEqualityCheck: shallowEqual
          }
        })
      ), [select, stableArg]);
      const querySelector = (0, import_react.useMemo)(() => selectFromResult ? createSelector2([selectDefaultResult], selectFromResult, {
        devModeChecks: {
          identityFunctionCheck: "never"
        }
      }) : selectDefaultResult, [selectDefaultResult, selectFromResult]);
      const currentState = useSelector2((state) => querySelector(state, lastValue.current), shallowEqual);
      const store = useStore2();
      const newLastValue = selectDefaultResult(store.getState(), lastValue.current);
      useIsomorphicLayoutEffect(() => {
        lastValue.current = newLastValue;
      }, [newLastValue]);
      return currentState;
    };
    return useQueryState;
  }
  function usePromiseRefUnsubscribeOnUnmount(promiseRef) {
    (0, import_react.useEffect)(() => {
      return () => {
        var _a, _b;
        (_b = (_a = promiseRef.current) == null ? void 0 : _a.unsubscribe) == null ? void 0 : _b.call(_a);
        promiseRef.current = void 0;
      };
    }, [promiseRef]);
  }
  function refetchOrErrorIfUnmounted(promiseRef) {
    if (!promiseRef.current) throw new Error(false ? formatProdErrorMessage(38) : "Cannot refetch a query that has not been started yet.");
    return promiseRef.current.refetch();
  }
  function buildQueryHooks(endpointName) {
    const useQuerySubscription = (arg, options = {}) => {
      const [promiseRef] = useQuerySubscriptionCommonImpl(endpointName, arg, options);
      usePromiseRefUnsubscribeOnUnmount(promiseRef);
      return (0, import_react.useMemo)(() => ({
        /**
         * A method to manually refetch data for the query
         */
        refetch: () => refetchOrErrorIfUnmounted(promiseRef)
      }), [promiseRef]);
    };
    const useLazyQuerySubscription = ({
      refetchOnReconnect,
      refetchOnFocus,
      pollingInterval = 0,
      skipPollingIfUnfocused = false
    } = {}) => {
      const {
        initiate
      } = api.endpoints[endpointName];
      const dispatch = useDispatch2();
      const [arg, setArg] = (0, import_react.useState)(UNINITIALIZED_VALUE);
      const promiseRef = (0, import_react.useRef)(void 0);
      const stableSubscriptionOptions = useShallowStableValue({
        refetchOnReconnect,
        refetchOnFocus,
        pollingInterval,
        skipPollingIfUnfocused
      });
      usePossiblyImmediateEffect(() => {
        var _a, _b;
        const lastSubscriptionOptions = (_a = promiseRef.current) == null ? void 0 : _a.subscriptionOptions;
        if (stableSubscriptionOptions !== lastSubscriptionOptions) {
          (_b = promiseRef.current) == null ? void 0 : _b.updateSubscriptionOptions(stableSubscriptionOptions);
        }
      }, [stableSubscriptionOptions]);
      const subscriptionOptionsRef = (0, import_react.useRef)(stableSubscriptionOptions);
      usePossiblyImmediateEffect(() => {
        subscriptionOptionsRef.current = stableSubscriptionOptions;
      }, [stableSubscriptionOptions]);
      const trigger = (0, import_react.useCallback)(function(arg2, preferCacheValue = false) {
        let promise;
        batch2(() => {
          var _a;
          (_a = promiseRef.current) == null ? void 0 : _a.unsubscribe();
          promiseRef.current = promise = dispatch(initiate(arg2, {
            subscriptionOptions: subscriptionOptionsRef.current,
            forceRefetch: !preferCacheValue
          }));
          setArg(arg2);
        });
        return promise;
      }, [dispatch, initiate]);
      const reset = (0, import_react.useCallback)(() => {
        var _a, _b;
        if ((_a = promiseRef.current) == null ? void 0 : _a.queryCacheKey) {
          dispatch(api.internalActions.removeQueryResult({
            queryCacheKey: (_b = promiseRef.current) == null ? void 0 : _b.queryCacheKey
          }));
        }
      }, [dispatch]);
      (0, import_react.useEffect)(() => {
        return () => {
          var _a;
          (_a = promiseRef == null ? void 0 : promiseRef.current) == null ? void 0 : _a.unsubscribe();
        };
      }, []);
      (0, import_react.useEffect)(() => {
        if (arg !== UNINITIALIZED_VALUE && !promiseRef.current) {
          trigger(arg, true);
        }
      }, [arg, trigger]);
      return (0, import_react.useMemo)(() => [trigger, arg, {
        reset
      }], [trigger, arg, reset]);
    };
    const useQueryState = buildUseQueryState(endpointName, queryStatePreSelector);
    return {
      useQueryState,
      useQuerySubscription,
      useLazyQuerySubscription,
      useLazyQuery(options) {
        const [trigger, arg, {
          reset
        }] = useLazyQuerySubscription(options);
        const queryStateResults = useQueryState(arg, {
          ...options,
          skip: arg === UNINITIALIZED_VALUE
        });
        const info = (0, import_react.useMemo)(() => ({
          lastArg: arg
        }), [arg]);
        return (0, import_react.useMemo)(() => [trigger, {
          ...queryStateResults,
          reset
        }, info], [trigger, queryStateResults, reset, info]);
      },
      useQuery(arg, options) {
        const querySubscriptionResults = useQuerySubscription(arg, options);
        const queryStateResults = useQueryState(arg, {
          selectFromResult: arg === skipToken || (options == null ? void 0 : options.skip) ? void 0 : noPendingQueryStateSelector,
          ...options
        });
        const debugValue = pick(queryStateResults, ...COMMON_HOOK_DEBUG_FIELDS);
        (0, import_react.useDebugValue)(debugValue);
        return (0, import_react.useMemo)(() => ({
          ...queryStateResults,
          ...querySubscriptionResults
        }), [queryStateResults, querySubscriptionResults]);
      }
    };
  }
  function buildInfiniteQueryHooks(endpointName) {
    const useInfiniteQuerySubscription = (arg, options = {}) => {
      const [promiseRef, dispatch, initiate, stableSubscriptionOptions] = useQuerySubscriptionCommonImpl(endpointName, arg, options);
      const subscriptionOptionsRef = (0, import_react.useRef)(stableSubscriptionOptions);
      usePossiblyImmediateEffect(() => {
        subscriptionOptionsRef.current = stableSubscriptionOptions;
      }, [stableSubscriptionOptions]);
      const trigger = (0, import_react.useCallback)(function(arg2, direction) {
        let promise;
        batch2(() => {
          var _a;
          (_a = promiseRef.current) == null ? void 0 : _a.unsubscribe();
          promiseRef.current = promise = dispatch(initiate(arg2, {
            subscriptionOptions: subscriptionOptionsRef.current,
            direction
          }));
        });
        return promise;
      }, [promiseRef, dispatch, initiate]);
      usePromiseRefUnsubscribeOnUnmount(promiseRef);
      const stableArg = useStableQueryArgs(
        options.skip ? skipToken : arg,
        // Even if the user provided a per-endpoint `serializeQueryArgs` with
        // a consistent return value, _here_ we want to use the default behavior
        // so we can tell if _anything_ actually changed. Otherwise, we can end up
        // with a case where the query args did change but the serialization doesn't,
        // and then we never try to initiate a refetch.
        defaultSerializeQueryArgs,
        context.endpointDefinitions[endpointName],
        endpointName
      );
      const refetch = (0, import_react.useCallback)(() => refetchOrErrorIfUnmounted(promiseRef), [promiseRef]);
      return (0, import_react.useMemo)(() => {
        const fetchNextPage = () => {
          return trigger(stableArg, "forward");
        };
        const fetchPreviousPage = () => {
          return trigger(stableArg, "backward");
        };
        return {
          trigger,
          /**
           * A method to manually refetch data for the query
           */
          refetch,
          fetchNextPage,
          fetchPreviousPage
        };
      }, [refetch, trigger, stableArg]);
    };
    const useInfiniteQueryState = buildUseQueryState(endpointName, infiniteQueryStatePreSelector);
    return {
      useInfiniteQueryState,
      useInfiniteQuerySubscription,
      useInfiniteQuery(arg, options) {
        const {
          refetch,
          fetchNextPage,
          fetchPreviousPage
        } = useInfiniteQuerySubscription(arg, options);
        const queryStateResults = useInfiniteQueryState(arg, {
          selectFromResult: arg === skipToken || (options == null ? void 0 : options.skip) ? void 0 : noPendingQueryStateSelector,
          ...options
        });
        const debugValue = pick(queryStateResults, ...COMMON_HOOK_DEBUG_FIELDS, "hasNextPage", "hasPreviousPage");
        (0, import_react.useDebugValue)(debugValue);
        return (0, import_react.useMemo)(() => ({
          ...queryStateResults,
          fetchNextPage,
          fetchPreviousPage,
          refetch
        }), [queryStateResults, fetchNextPage, fetchPreviousPage, refetch]);
      }
    };
  }
  function buildMutationHook(name) {
    return ({
      selectFromResult,
      fixedCacheKey
    } = {}) => {
      const {
        select,
        initiate
      } = api.endpoints[name];
      const dispatch = useDispatch2();
      const [promise, setPromise] = (0, import_react.useState)();
      (0, import_react.useEffect)(() => () => {
        if (!(promise == null ? void 0 : promise.arg.fixedCacheKey)) {
          promise == null ? void 0 : promise.reset();
        }
      }, [promise]);
      const triggerMutation = (0, import_react.useCallback)(function(arg) {
        const promise2 = dispatch(initiate(arg, {
          fixedCacheKey
        }));
        setPromise(promise2);
        return promise2;
      }, [dispatch, initiate, fixedCacheKey]);
      const {
        requestId
      } = promise || {};
      const selectDefaultResult = (0, import_react.useMemo)(() => select({
        fixedCacheKey,
        requestId: promise == null ? void 0 : promise.requestId
      }), [fixedCacheKey, promise, select]);
      const mutationSelector = (0, import_react.useMemo)(() => selectFromResult ? createSelector2([selectDefaultResult], selectFromResult) : selectDefaultResult, [selectFromResult, selectDefaultResult]);
      const currentState = useSelector2(mutationSelector, shallowEqual);
      const originalArgs = fixedCacheKey == null ? promise == null ? void 0 : promise.arg.originalArgs : void 0;
      const reset = (0, import_react.useCallback)(() => {
        batch2(() => {
          if (promise) {
            setPromise(void 0);
          }
          if (fixedCacheKey) {
            dispatch(api.internalActions.removeMutationResult({
              requestId,
              fixedCacheKey
            }));
          }
        });
      }, [dispatch, fixedCacheKey, promise, requestId]);
      const debugValue = pick(currentState, ...COMMON_HOOK_DEBUG_FIELDS, "endpointName");
      (0, import_react.useDebugValue)(debugValue);
      const finalState = (0, import_react.useMemo)(() => ({
        ...currentState,
        originalArgs,
        reset
      }), [currentState, originalArgs, reset]);
      return (0, import_react.useMemo)(() => [triggerMutation, finalState], [triggerMutation, finalState]);
    };
  }
}
var reactHooksModuleName = Symbol();
var reactHooksModule = ({
  batch: batch2 = batch,
  hooks = {
    useDispatch,
    useSelector,
    useStore
  },
  createSelector: createSelector2 = createSelector,
  unstable__sideEffectsInRender = false,
  ...rest
} = {}) => {
  if (true) {
    const hookNames = ["useDispatch", "useSelector", "useStore"];
    let warned = false;
    for (const hookName of hookNames) {
      if (countObjectKeys(rest) > 0) {
        if (rest[hookName]) {
          if (!warned) {
            console.warn("As of RTK 2.0, the hooks now need to be specified as one object, provided under a `hooks` key:\n`reactHooksModule({ hooks: { useDispatch, useSelector, useStore } })`");
            warned = true;
          }
        }
        hooks[hookName] = rest[hookName];
      }
      if (typeof hooks[hookName] !== "function") {
        throw new Error(false ? formatProdErrorMessage(36) : `When using custom hooks for context, all ${hookNames.length} hooks need to be provided: ${hookNames.join(", ")}.
Hook ${hookName} was either not provided or not a function.`);
      }
    }
  }
  return {
    name: reactHooksModuleName,
    init(api, {
      serializeQueryArgs
    }, context) {
      const anyApi = api;
      const {
        buildQueryHooks,
        buildInfiniteQueryHooks,
        buildMutationHook,
        usePrefetch
      } = buildHooks({
        api,
        moduleOptions: {
          batch: batch2,
          hooks,
          unstable__sideEffectsInRender,
          createSelector: createSelector2
        },
        serializeQueryArgs,
        context
      });
      safeAssign(anyApi, {
        usePrefetch
      });
      safeAssign(context, {
        batch: batch2
      });
      return {
        injectEndpoint(endpointName, definition) {
          if (isQueryDefinition(definition)) {
            const {
              useQuery,
              useLazyQuery,
              useLazyQuerySubscription,
              useQueryState,
              useQuerySubscription
            } = buildQueryHooks(endpointName);
            safeAssign(anyApi.endpoints[endpointName], {
              useQuery,
              useLazyQuery,
              useLazyQuerySubscription,
              useQueryState,
              useQuerySubscription
            });
            api[`use${capitalize(endpointName)}Query`] = useQuery;
            api[`useLazy${capitalize(endpointName)}Query`] = useLazyQuery;
          }
          if (isMutationDefinition(definition)) {
            const useMutation = buildMutationHook(endpointName);
            safeAssign(anyApi.endpoints[endpointName], {
              useMutation
            });
            api[`use${capitalize(endpointName)}Mutation`] = useMutation;
          } else if (isInfiniteQueryDefinition(definition)) {
            const {
              useInfiniteQuery,
              useInfiniteQuerySubscription,
              useInfiniteQueryState
            } = buildInfiniteQueryHooks(endpointName);
            safeAssign(anyApi.endpoints[endpointName], {
              useInfiniteQuery,
              useInfiniteQuerySubscription,
              useInfiniteQueryState
            });
            api[`use${capitalize(endpointName)}InfiniteQuery`] = useInfiniteQuery;
          }
        }
      };
    }
  };
};
function ApiProvider(props) {
  const context = props.context || ReactReduxContext;
  const existingContext = (0, import_react4.useContext)(context);
  if (existingContext) {
    throw new Error(false ? formatProdErrorMessage(35) : "Existing Redux context detected. If you already have a store set up, please use the traditional Redux setup.");
  }
  const [store] = React.useState(() => configureStore({
    reducer: {
      [props.api.reducerPath]: props.api.reducer
    },
    middleware: (gDM) => gDM().concat(props.api.middleware)
  }));
  (0, import_react5.useEffect)(() => props.setupListeners === false ? void 0 : setupListeners(store.dispatch, props.setupListeners), [props.setupListeners, store.dispatch]);
  return React.createElement(Provider_default, { store, context }, props.children);
}
var createApi = buildCreateApi(coreModule(), reactHooksModule());
export {
  ApiProvider,
  NamedSchemaError,
  QueryStatus,
  UNINITIALIZED_VALUE,
  _NEVER,
  buildCreateApi,
  copyWithStructuralSharing,
  coreModule,
  coreModuleName,
  createApi,
  defaultSerializeQueryArgs,
  fakeBaseQuery,
  fetchBaseQuery,
  reactHooksModule,
  reactHooksModuleName,
  retry,
  setupListeners,
  skipToken
};
//# sourceMappingURL=@reduxjs_toolkit_query_react.js.map
