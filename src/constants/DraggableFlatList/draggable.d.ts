export { };

declare global {
  var LayoutAnimationRepository: {
    configs: Record<number, unknown>;
    registerConfig: (tag: number, config: unknown) => void;
    removeConfig: (tag: number) => void;
  };
  var RNDFLLayoutAnimationConfigStash:
    | Record<number, unknown>
    | undefined;
}
