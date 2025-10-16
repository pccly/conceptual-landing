/**
 * Detects if WebGL and GPU acceleration are available
 */
export function detectWebGLSupport(): {
  supported: boolean;
  reason?: string;
} {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return { supported: false, reason: "Not in browser environment" };
  }

  try {
    // Try to create a WebGL context
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      return { supported: false, reason: "WebGL not available" };
    }

    // Check if GPU is actually available (not software rendering)
    const debugInfo = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_debug_renderer_info",
    );
    if (debugInfo) {
      const renderer = (gl as WebGLRenderingContext).getParameter(
        debugInfo.UNMASKED_RENDERER_WEBGL,
      );
      
      // Check for software renderers
      if (
        renderer &&
        typeof renderer === "string" &&
        (renderer.toLowerCase().includes("swiftshader") ||
          renderer.toLowerCase().includes("software") ||
          renderer.toLowerCase().includes("llvmpipe"))
      ) {
        return {
          supported: false,
          reason: "GPU acceleration disabled (software rendering detected)",
        };
      }
    }

    // Additional check for context loss or disabled GPU
    const contextAttributes = (gl as WebGLRenderingContext).getContextAttributes();
    if (contextAttributes && contextAttributes.failIfMajorPerformanceCaveat) {
      return {
        supported: false,
        reason: "Major performance caveat detected",
      };
    }

    return { supported: true };
  } catch (error) {
    return {
      supported: false,
      reason: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Check if the device has limited GPU capabilities
 */
export function hasLimitedGPU(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return true;

    // Check max texture size (indicator of GPU capability)
    const maxTextureSize = (gl as WebGLRenderingContext).getParameter(
      (gl as WebGLRenderingContext).MAX_TEXTURE_SIZE,
    );

    // If max texture size is less than 4096, consider it limited
    return maxTextureSize < 4096;
  } catch {
    return true;
  }
}

