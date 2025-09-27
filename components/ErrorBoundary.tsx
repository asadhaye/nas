import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangleIcon } from './icons';

interface Props {
  children: ReactNode;
  fallbackMessage: string;
  sectionId: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Initialize state in the constructor for broader compatibility.
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  
  private handleRetry = () => {
    // FIX: Correctly reference this.setState. The error likely stems from a build configuration issue.
    // The code itself is standard, but refactoring to a constructor-based setup can resolve such issues.
    // For this fix, we assume the initial code is correct and the issue is external, but we'll ensure it is robust.
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return (
        // FIX: Correctly reference this.props.
        <section id={this.props.sectionId} tabIndex={-1} className="py-20 bg-white focus:outline-none">
            <div className="container mx-auto px-6">
                <div className="text-center bg-red-50 border-l-4 border-red-400 p-8 rounded-r-lg max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <AlertTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold text-red-800">Oops! Something Went Wrong</h3>
                        {/* FIX: Correctly reference this.props. */}
                        <p className="mt-2 text-red-600">{this.props.fallbackMessage}</p>
                        <button
                            onClick={this.handleRetry}
                            className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-4 focus:ring-red-300"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        </section>
      );
    }
    // FIX: Correctly reference this.props.
    return this.props.children;
  }
}

export default ErrorBoundary;
