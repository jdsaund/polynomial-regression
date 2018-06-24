This tool allows fitting degree `n` polynomials to 2D data with some control over the hyperparameters used.

The CPU version of TensorFlow.js was used because this project is a lightweight demo and is optimised for compatibility rather than raw performance. In the case of training larger models, the Linux GPU TensorFlow.js is preferred for large performance gains on CUDA enabled Linux systems.

Coefficients encoded with tensors is abstracted with the Polynomial class. This was done to avoid code duplication and to abstract the individual TensorFlow API calls to a higher level concept of evaluating a point.

A factory pattern was chosen to create common Polynomial objects. This reduced code complexity.

Operations involving evaluating the data were kept as tensor ops where possible to take advantage vast parallelism and to avoid inefficiencies related to moving data in and out of the TensorFlow session.
