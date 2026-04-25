use std::collections::HashMap;

trait Summary {
    fn summarize(&self) -> String {
        String::from("Something...")
    }
}

struct User {
    username: String,
    email: String,
}

impl Summary for User {}


struct User2<'a> {
    name: &'a str,
    email: &'a str,
}

fn main(){
    // vectors
    let mut vec1 = Vec::new();
    vec1.push(1);
    vec1.push(2);
    vec1.push(3);
    println!("{:?}", even_filter(&vec1));
    // println!("{:?}", vec1); // vec1 is moved into even_filter

    let mut vec2 = vec![1,2,3];

    // HashMaps
    let mut map = HashMap::new();
    map.insert(String::from("one"), 1);
    map.insert(String::from("two"), 2);

    // let mut map2: HashMap<String, i32> = HashMap::new();

    let value = map.get("one");  // Option because key may not exist


    // Itertors
    let iter1 = vec2.iter();
    for val in iter1 {
        println!("{}", val);
    }
    let mut iter2 = vec2.iter_mut();
    for val in iter2 {
        *val += 10;
        println!("{}", val);
    }

    let mut iter3 = vec2.iter();
    while let Some(val) = iter3.next() {
        println!("{}", val);
    } 

    // vec2.into_iter(); // vec2 is moved here  
    // iter.sum(); // consumes the iterator
/*
    for val in vec2 {            same as iterinto method...
        println!("{}", val);     here vec2 is consumed
    }
*/

    let vec3 = vec![1, 2, 3, 4, 5, 6];
    let new_iter = vec3.iter();
    // let a_iter = new_iter.map(|x| x + 2);
    let b_iter = new_iter.filter(|x| **x > 2).map(|x| x+2);
    let new_vec: Vec<i32> = b_iter.collect();
    for val in new_vec {
        print!("====");
        println!("{}", val);
    }

    let mut word = String::from("hello world");
    let word2 = &word[0..5];

    // word.clear();
    // println!("{}", word2);

    let string1 = String::from("abcd");
    let user2: User2;
    {
        // let string2 = String::from("xyz"); 
        let string2 = "xyz";   
        user2 = User2 {
            name: &string1,
            email: string2,
        };
    }
    println!("{}", user2.email);

}

// means return str is valid as long as both input str are valid
fn longest_str<'a>(str1: &'a str, str2: &'a str) -> &'a str {
    if str1.len() > str2.len() {
        str1
    } else {
        str2
    }
}


fn some_fn(item: &impl Summary) {
    println!("{}", item.summarize());
}

/*
fn some_fn<T: Summary+Another_trait>(item: &T){
    println!("{}", item.summarize());
}
*/

fn even_filter(vec: &Vec<i32>) -> Vec<i32> {
    let mut new_vec: Vec<i32> = Vec::new();
    for val in vec{
        if val%2==0 {
            new_vec.push(*val);
        }
    }
    return new_vec;
}

// dont give code suggetion while i am writing the code, fucking copilot
fn get_map(vec: &Vec<(String, i32)>) -> HashMap<String, Vec<i32>> {
    let mut ans: HashMap<String, Vec<i32>> = HashMap::new();
    for (key, value) in vec {
        if ans.contains_key(key) {
            let temp_vec = ans.get_mut(key).unwrap();
            temp_vec.push(*value);
        } else {
            ans.insert(key.clone(), vec![*value]);
        }
    }
    return ans;
}




/*
fn longest(a: &str, b: &str) -> &str {
if a.len() > b.len() {
return a;
} else {
return b;

}

Run | Debug
fn main() {
let longest_str;
let str1 = String: : from("small");
{
    let str2 = String :: from("longer");
    longest_str = longest(a: &str1, b: &str2);
    
}
println! ("{}", longest_str);

}
*/