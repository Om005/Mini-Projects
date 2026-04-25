use std::collections::HashMap;

fn main(){
    let mut vec = Vec::new();

    vec.push(1);
    vec.push(2);
    vec.push(3);

    println!("{:?}", vec);

    let ans = even_filer(&vec);

    println!("{:?}", ans);

    let vec2 = vec![1, 2, 3, 4];


    let mut users: HashMap<String, u32> = HashMap::new();

    users.insert(String::from("Om"), 19);
    users.insert(String::from("some"), 20);

    let first_user_age = users.get("Om");

    match first_user_age {
        Some(val) => println!("{}", val),
        None => println!("No sir")
    };


    let pairs: Vec<(String, Vec<i32>)> = vec![
        (String::from("first"), [1, 2, 3].to_vec()),
        (String::from("second"), [3, 4, 5].to_vec()),
        (String::from("third"), [3, 4, 5].to_vec()),
        (String::from("first"), [10, 20, 37].to_vec()),
    ];

    let ans = make_map(&pairs);
    println!("{:?}", ans);


    let mut v1 = vec![1, 2, 3];
    let iter = v1.iter();  // ---> do not take ownership of v1

    // let iter = v1.into_iter()  ----> will take ownership of v1

    let mut iter22 = v1.iter();
    while let Some(val) = iter22.next(){
        println!("{}", val);
    }
    // println!("{:?}", iter);
    for val in iter {
        println!("{}", val)
    }

    let mut iter2 = v1.iter_mut();
    for val in iter2 {
        *val = *val+2;
    }


    let nums = vec![23, 3, 4, 45];
    for num in nums {
        println!("{}", num);
    }
    // println!("{:?}", nums);   --> no sir


}

fn even_filer(vec: &Vec<i32>) -> Vec<i32>{
    let mut new_vec = Vec::new();

    for val in vec {
        if val%2==0 {
            new_vec.push(*val);
        }
    }
    return new_vec;
}

// fn make_map(pairs: Vec<(String, Vec<i32>)>) -> HashMap<String, Vec<i32>> {
//     let mut ans: HashMap<String, Vec<i32>> = HashMap::new();

//     for (key, values) in pairs {
//         let exist = ans.get(&key);
//         match exist {
//             Some(vec) => continue,
//             None => ans.insert(key, values)
//         };
//     }

//     return ans;
// }

fn make_map(pairs: &Vec<(String, Vec<i32>)>) -> HashMap<String, Vec<i32>> {
    let mut ans: HashMap<String, Vec<i32>> = HashMap::new();

    for (key, values) in pairs {
        if ans.contains_key(key.as_str()) {
            continue;   
        }
        ans.insert(key.clone(), values.clone());
    }

    return ans;
}
