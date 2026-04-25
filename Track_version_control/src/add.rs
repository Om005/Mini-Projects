// later
use std::{io, path::PathBuf};
use serde_json::value::Index;
use crate::repository::Repository;
use std::path;
use std::fs;
use crate::index;
use crate::object;


// Adds a file to the repository's index and to .track/objects as a blob
pub fn add(repo: &Repository, file_path: impl AsRef<path::Path>) -> io::Result<()> {

    
    let file_ref = file_path.as_ref();

    // Determine the full path of the file
    let full_path: PathBuf;
    if file_ref.is_absolute() {
        full_path = file_ref.to_path_buf();
    } else {
        full_path = repo.path.parent().unwrap().join(file_ref);
    }

    // Check if the file exists and is not a directory
    if !full_path.exists() {
        return Err(io::Error::new(
            io::ErrorKind::NotFound,
            format!("file not found: {}", full_path.display()),
        ));
    }
    if full_path.is_dir() {
        return Err(io::Error::new(
            io::ErrorKind::InvalidInput,
            format!("path is a directory: {}", full_path.display()),
        ));
    }

    // Get the relative path of the file with respect to the repository root
    let rel_path = full_path.strip_prefix(&repo.path.parent().unwrap()).map_err(|e| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!("file is outside the repository: {}", e),
        )
    })?;

    // Read the file data, store it as a blob object, and create an index entry
    let data = fs::read(&full_path)?;
    let hash = object::store_blob(repo, &data)?;

    // Create an index entry and add it to the index
    let entry = index::IndexEntry::new(rel_path.to_path_buf(), hash);

    // Add the entry to the index
    index::add_entry(repo, entry)?;

    Ok(())
}