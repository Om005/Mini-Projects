
use sha2::{Sha256, Digest};
use crate::{object, repository::Repository};
use std::io;
use std::fs;

// Enum representing different object types
pub enum ObjectType {
    Blob,
    Tree,
    Commit,
}

// Methods for ObjectType
impl ObjectType {
    pub fn as_str(&self) -> &'static str {
        match self {
            ObjectType::Blob => "blob",
            ObjectType::Tree => "tree",
            ObjectType::Commit => "commit",
        }
    }
}


// Creates the object content with header
pub fn create_object(object_type: ObjectType, data: &[u8]) -> Vec<u8> {
    let header = format!("{} {}\0", object_type.as_str(), data.len());
    let mut content = header.into_bytes();
    content.extend_from_slice(data);
    content
}

// Hashes the object content using SHA-256
pub fn hash_object(content: &[u8]) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content);

    let hash = format!("{:x}", hasher.finalize());
    hash
}

// Stores a blob object in the repository and returns its hash
pub fn store_blob(repo: &Repository, data: &[u8]) -> io::Result<String> {
    let object_content = create_object(ObjectType::Blob, data);
    let hash = hash_object(&object_content);

    let object_dir = &hash[0..4];
    let object_name = &hash[4..];
    let object_path = repo.objects_dir_path().join(&object_dir).join(&object_name);
    if object_path.exists() {
        return Ok(hash);
    }

    fs::create_dir_all(object_path.parent().unwrap())?;
    fs::write(&object_path, object_content)?;

    Ok(hash)
}