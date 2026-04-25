use std::thread;
use std::time::Duration;
use std::sync::mpsc;

fn main(){
    let (tx, rx) = mpsc::channel();
    for i in 0..5 {
        let producer = tx.clone();
        thread::spawn(move || {
            let mut ans: u64 = 0;
            for j in 0..10000000 {
                ans = ans + (i*10000000+j);
            }
            producer.send(ans).unwrap();
        });
    }
    drop(tx);
    let mut ans: u64 = 0;
    for val in rx {
        ans = ans+val;
        println!("Found value!");
    }
    println!("Total: {}", ans);
    
}

// fn main() {
//     let handle = thread::spawn(|| {
//         for i in 1..10 {
//             println!("hi number {}, from spawned thread", i);
//             thread::sleep(Duration::from_millis(1));
//         }
//     });
    
//     handle.join().unwrap();

//     for i in 1..5 {
//         println!("hi number {}, from main thread", i);
//         thread::sleep(Duration::from_millis(1));    
//     }

//     {
//         let v = vec![1, 2, 3];
//         let v1 = vec![1, 2, 3];
//         let handle = thread::spawn(move || {
//             println!("value: {:?}", v);
//         });
//         println!("value: {:?}", v1);
//     }
//     // some code

//     let (tx, rx) = mpsc::channel();
//     thread::spawn(move || {
//         let str = String::from("Some msg");
//         tx.send(str).unwrap();
//     });

//     let received = rx.recv().unwrap();
//     println!("Received: {}", received);

// }