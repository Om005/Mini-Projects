use std::path;
use std::path::PathBuf;
use crate::{repository::Repository};
use std::io;
use std::fs;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct IndexEntry {
    pub path: path::PathBuf,
    pub hash: String,
}

impl IndexEntry{
    pub fn new(path: path::PathBuf, hash: String) -> Self {
        IndexEntry { path, hash }
    }
}

pub fn read_index(repo: &Repository) -> io::Result<Vec<IndexEntry>> {
    let index_path = repo.index_path();
    
    if !index_path.exists() {
        return Ok(Vec::new());
    }

    let entries = fs::read_to_string(&index_path)?;
    if entries.trim().is_empty() {
        return Ok(Vec::new());
    }

    serde_json::from_str(&entries).map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))
    // Ok(entries)
}

pub fn write_index(repo: &Repository, entries: &[IndexEntry]) -> io::Result<()> {

    let index_path = repo.index_path();
    let s = serde_json::to_string(entries).map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
    fs::write(&index_path, s)?;

    Ok(())
}

pub fn add_entry(repo: &Repository, entry: IndexEntry) -> io::Result<()>{
    let mut entries = read_index(repo)?;
    if let Some(pos) = entries.iter().position(|e| e.path == entry.path) {
        entries[pos] = entry;
    } else {
        entries.push(entry);
    }
    write_index(repo, &entries)
}
pub fn get_entry(repo: &Repository, path: &PathBuf) -> io::Result<Option<IndexEntry>> {
    let entries = read_index(repo)?;
    Ok(entries.into_iter().find(|e| e.path == *path))
}