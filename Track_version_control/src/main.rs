use std::{io::{self, Write}, path::PathBuf};
use colored::*;

use crate::repository::Repository;  // <-- add this

mod repository;
mod init;
// mod add;
// mod index;
mod object;
mod index;
mod add;
// mod object;


// fn main() {
//     println!("{}", "Track CLI (type 'exit' to quit)".bright_cyan());

//     loop {
//         print!("{}", "> ".bright_yellow());
//         io::stdout().flush().unwrap();

//         let mut input = String::new();
//         if io::stdin().read_line(&mut input).is_err() {
//             eprintln!("{}", "Failed to read input.".red());
//             continue;
//         }

//         let input = input.trim();
//         if input == "exit" {
//             println!("{}", "Goodbye!".bright_green());
//             break;
//         }
//         if input.is_empty() {
//             continue;
//         }

//         let parts: Vec<&str> = input.split_whitespace().collect();
//         let command = parts[0];
//         let args = &parts[1..];

//         match command {
//             "track" => {
//                 if args.is_empty() {
//                     eprintln!("{}", "Usage: track <command>".red());
//                     continue;
//                 }
//                 match args[0] {
//                     "init" => {
//                         match init::init_repo() {
//                             Ok(_) => println!("{}", "Repository initialized.".bright_green()),
//                             Err(e) => eprintln!("{}", e.to_string().red()),
//                         }
//                     }
//                     "add" => {
//                         if args.len() < 2 {
//                             eprintln!("{}", "Usage: track add <file>".red());
//                             continue;
//                         }
//                         match add::add_file(args[1]) {
//                             Ok(_) => println!("{}", format!("Added file: {}", args[1]).bright_green()),
//                             Err(e) => eprintln!("{}", format!("Error: {}", e).red()),
//                         }
//                     }
//                     _ => {
//                         eprintln!("{}", format!("Unknown command: {}", args[0]).red());
//                     }
//                 }
//             }
//             _ => {
//                 eprintln!("{}", format!("Unknown input: {}", input).red());
//             }
//         }
//     }
// }
 

fn main(){
    let mut kk = init::init_repository();
    let repo = match kk {
        Ok(repo) => repo,
        Err(e) => {
            Repository { path: PathBuf::from(e.to_string().replace("//", "/")) }
        },
    };
    
    let kk = add::add(&repo, "PROGRESS.txt");
    match kk {
        Ok(_) => println!("{}", "File added successfully.".bright_green()),
        Err(e) => eprintln!("{}", format!("Error adding file: {}", e).red()),
    }
    // println!("Repository path: {:?}", repo.path);

    // let data = std::fs::read("PROGRESS.txt");
    // let file_data = match data {
    //     Ok(content) => content,
    //     Err(e) => {
    //         println!("{}", e.to_string().red());
    //         return; 
    //     },
    // };

    // let hash = object::hash_object(&file_data);

    // let entry = index::IndexEntry::new(PathBuf::from("PROGRESS.txt"), hash);

    // index::add_entry(&repo, entry).unwrap();

    // add::add_file(&repo, std::path::Path::new("file.txt")).unwrap();
}