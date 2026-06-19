import pool from '../config/db.js';

export const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { name, designation, cgpa, bio, email, github, linkedin, profile_photo } = req.body;

  if (!name || !designation || !cgpa || !bio) {
    return res.status(400).json({ message: 'Name, designation, CGPA and Bio are required' });
  }

  try {
    // Check if a profile exists
    const [rows] = await pool.query('SELECT id FROM profile LIMIT 1');
    if (rows.length === 0) {
      // Create one if it does not exist
      await pool.query(
        'INSERT INTO profile (name, designation, cgpa, bio, email, github, linkedin, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, designation, cgpa, bio, email || '', github || '', linkedin || '', profile_photo || '']
      );
    } else {
      // Update the existing one
      const profileId = rows[0].id;
      await pool.query(
        'UPDATE profile SET name = ?, designation = ?, cgpa = ?, bio = ?, email = ?, github = ?, linkedin = ?, profile_photo = ? WHERE id = ?',
        [name, designation, cgpa, bio, email || '', github || '', linkedin || '', profile_photo || '', profileId]
      );
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
