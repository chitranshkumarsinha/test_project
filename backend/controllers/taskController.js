import Task from '../models/Task.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/v1/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const { completed, sort } = req.query;

    // Build query
    let query = { user: req.user.id };

    // Filter by completed status if provided
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    // Execute query
    let tasks = Task.find(query);

    // Sorting
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      tasks = tasks.sort(sortBy);
    } else {
      tasks = tasks.sort('-createdAt');
    }

    const result = await tasks;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/v1/tasks/stats
// @access  Private
export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: '$completed',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = await Task.countDocuments({ user: req.user.id });

    // Format the response
    const completedTask = stats.find(s => s._id === true);
    const pendingTask = stats.find(s => s._id === false);

    res.status(200).json({
      success: true,
      data: {
        total: totalTasks,
        completed: completedTask ? completedTask.count : 0,
        pending: pendingTask ? pendingTask.count : 0
      }
    });
  } catch (error) {
    next(error);
  }
};