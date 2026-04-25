use std::path::{PathBuf};
use std::env;
use once_cell::sync::Lazy;
use std::io;


// Constants and functions related to repository paths
pub const REPO_DIR: &str = ".track";
pub const HEAD_FILE: &str = "HEAD";
pub const INDEX_FILE: &str = "index.db"; 
pub const OBJECTS_DIR: &str = "objects";
// pub const OBJECTS_DB: &str = "objects.db";
pub const CONFIG_FILE: &str = "config";
pub const REFS_DIR: &str = "refs";
pub const HEADS_DIR: &str = "heads";
pub const MAIN_BRANCH: &str = "main";
pub const TRACK_IGNORE: &str = ".trackignore";
pub const LOGS_DIR: &str = "logs";
pub const LOGS_HEAD: &str = "HEAD";

// Holds the absolute path to the .track directory once found or created.
pub struct Repository {
    pub path: PathBuf,
}

impl Repository {
    // Creates a Repository instance for the current working directory, used only by `track init`.
    pub fn new_at_cwd() -> io::Result<Repository> {
        let current_path = env::current_dir()?;
        let repo_path = current_path.join(REPO_DIR);
        Ok(Repository { path: repo_path })
    }
    
    // Searches for the repository starting from the given path and moving up the directory tree.
    pub fn find_repo(start_path: &PathBuf) -> Option<Repository> {
        let mut current = start_path.to_path_buf();
        'findloop: loop {
            let curr_repo_path = current.join(REPO_DIR);
            if curr_repo_path.is_dir() {
                return Some(Repository { path: curr_repo_path });
            }
            if let Some(parent) = current.parent() {
                current = parent.to_path_buf();
            } else {
                return None;
            }
        }
    }

    // Returns the root directory of the repository (the parent of the .track directory).
    pub fn root_path(&self) -> PathBuf {
        self.path.parent().unwrap_or(&self.path).to_path_buf()
    }

    // Returns the path to the objects directory within the repository.
    pub fn objects_dir_path(&self) -> PathBuf {
        self.path.join(OBJECTS_DIR)
    }

    // Returns the path to the objects database file within the repository.
    // pub fn objects_db_path(&self) -> PathBuf {
    //     self.objects_dir_path().join(OBJECTS_DB)d
    // }

    // Returns the path to the heads directory within the repository.
    pub fn heads_dir_path(&self) -> PathBuf {
        self.path.join(LOGS_DIR).join(REFS_DIR).join(HEADS_DIR)
    }

    // Returns the path to the logs HEAD file within the repository.
    pub fn log_head_path(&self) -> PathBuf {
        self.path.join(LOGS_DIR).join(LOGS_HEAD)
    }

    pub fn main_path(&self) -> PathBuf {
        self.heads_dir_path().join(MAIN_BRANCH)
    }

    // Returns the path to the index file within the repository.
    pub fn index_path(&self) -> PathBuf {
        self.path.join(INDEX_FILE)
    }

    // Returns the path to the HEAD file within the repository.
    pub fn head_path(&self) -> PathBuf {
        self.path.join(HEAD_FILE)
    }

    // Returns the path to the config file within the repository.
    pub fn config_path(&self) -> PathBuf {
        self.path.join(CONFIG_FILE)
    }

    pub fn track_ignore_path(&self) -> PathBuf {
        self.root_path().join(TRACK_IGNORE)
    }

}