import pool from '../config/db.js';

export const getSkills = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY created_at ASC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createSkill = async (req, res) => {
  const { name, level, icon } = req.body;

  if (!name || level === undefined || !icon) {
    return res.status(400).json({ message: 'Name, level, and icon are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO skills (name, level, icon) VALUES (?, ?, ?)',
      [name, parseInt(level), icon]
    );
    res.status(201).json({
      message: 'Skill created successfully!',
      skillId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level, icon } = req.body;

  if (!name || level === undefined || !icon) {
    return res.status(400).json({ message: 'Name, level, and icon are required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE skills SET name = ?, level = ?, icon = ? WHERE id = ?',
      [name, parseInt(level), icon, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM skills WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
