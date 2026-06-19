import pool from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createProject = async (req, res) => {
  const { title, description, technologies, github_link, live_link, image_url } = req.body;

  if (!title || !description || !technologies) {
    return res.status(400).json({ message: 'Title, description, and technologies are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, technologies, github_link, live_link, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, technologies, github_link || '', live_link || '', image_url || '']
    );
    res.status(201).json({
      message: 'Project created successfully!',
      projectId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, technologies, github_link, live_link, image_url } = req.body;

  if (!title || !description || !technologies) {
    return res.status(400).json({ message: 'Title, description, and technologies are required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE projects SET title = ?, description = ?, technologies = ?, github_link = ?, live_link = ?, image_url = ? WHERE id = ?',
      [title, description, technologies, github_link || '', live_link || '', image_url || '', id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
