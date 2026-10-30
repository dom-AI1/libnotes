import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  inline?: boolean;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Libnotes ErrorBoundary] Uncaught runtime error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.hash = '#/home';
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      if (this.props.inline) {
        return (
          <div className="py-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414] text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FDEDE8] border-2 border-[#E05B49] flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-[#E05B49]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#E05B49] bg-[#FDEDE8] px-2.5 py-1 rounded-full border border-[#E05B49]/30">
                VIEW RECOVERY
              </span>
              <h2 className="font-mono-editorial text-xl font-bold text-[#141414] mt-3 mb-2">
                Unable to display this view
              </h2>
              <p className="font-body text-xs text-[#5E5D57] mb-6 leading-relaxed">
                An unexpected issue occurred while rendering this section. Your notes and session are safe.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto btn-primary-green py-2 px-4 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Home</span>
                </button>
                <button
                  onClick={this.handleReload}
                  className="w-full sm:w-auto btn-secondary-outline py-2 px-4 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reload</span>
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#141414] text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FDEDE8] border-2 border-[#E05B49] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-[#E05B49]" />
            </div>
            
            <span className="text-xs font-mono font-bold text-[#E05B49] bg-[#FDEDE8] px-2.5 py-1 rounded-full border border-[#E05B49]/30">
              RECOVERY MODE
            </span>

            <h2 className="font-mono-editorial text-2xl font-bold text-[#141414] mt-3 mb-2">
              Something went wrong
            </h2>

            <p className="font-body text-sm text-[#5E5D57] mb-6 leading-relaxed">
              Libnotes encountered an unexpected display issue while rendering this view. Your saved notes and account are safe.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={this.handleReset}
                className="w-full sm:flex-1 btn-primary-green py-2.5 px-4 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto btn-secondary-outline py-2.5 px-4 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
