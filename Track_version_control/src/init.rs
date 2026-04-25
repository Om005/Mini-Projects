use crate::repository::{Repository};
use std::io;
use std::path::PathBuf;
use std::fs;
use std::env;

// Initial .track file structure:
// .trackignore            (file: patterns to ignore)
// .track/
// ├── HEAD                  (file: contains ref to current branch)
// ├── index.db              (file: staging area)
// ├── config.db             (file: user configuration)
// ├── objects/              (directory: stores all objects)
// └── logs/
//     └── refs/
//         └── heads/         (directory: stores all branch heads)
//             └── main       (file: main branch head)



pub fn init_repository() -> io::Result<Repository> {

    // Check if the repository already exists
    let current_path = env::current_dir()?;
    let exist = Repository::find_repo(&current_path);
    match exist {
    Some(repo) => {
        return Err(io::Error::new(
            io::ErrorKind::AlreadyExists,
            format!("{}", repo.path.to_str().unwrap()),
        ));
    }
    None => {}
}

    
    // Create the repository structure
    let repo = Repository::new_at_cwd()?;
    let repo_path = &repo.path;


    // Create the .track directory and its subdirectories
    fs::create_dir_all(repo_path)?;
    fs::create_dir_all(repo.objects_dir_path())?;
    fs::create_dir_all(repo.heads_dir_path())?;

    // Initialize essential files
    fs::write(repo.head_path(), "ref: refs/heads/main\n")?;
    fs::write(repo.index_path(), b"[]")?;
    fs::File::create(repo.config_path())?;
    // fs::File::create(repo.objects_db_path())?;
    fs::File::create(repo.main_path())?;
    fs::File::create(repo.log_head_path())?;
    fs::File::create(repo.track_ignore_path())?;

    // Return the initialized repository
    Ok(Repository { path: repo_path.to_path_buf() })

}