use std::{fmt::Error, vec};

trait Serialize {
    fn serialize(&self) -> Vec<u8>;
}
trait Deserialize: Sized {
    fn deserialize(base: &Vec<u8>) -> Result<Self, Error>;
}

#[derive(Debug)]
struct Swap {
    qty_1: u32,
    qty_2: u32,
}

impl Serialize for Swap {
    fn serialize(&self) -> Vec<u8> {
        let mut v = vec![]; 
        v.extend(&self.qty_1.to_be_bytes());
        v.extend(&self.qty_2.to_be_bytes());
        v
    }
}

impl Deserialize for Swap {
    fn deserialize(base: &Vec<u8>) -> Result<Self, Error> {
        if base.len() < 8 {
            return Err(Error);
        }
        let qty_1 = u32::from_be_bytes([base[0], base[1], base[2], base[3]]);
        let qty_2 = u32::from_be_bytes([base[4], base[5], base[6], base[7]]);
        Ok(Swap { qty_1, qty_2 })
    }
}

fn main(){
    let swap = Swap { qty_1: 256*2, qty_2: 256*2 };
    let serialized = swap.serialize();
    println!("Serialized: {:?}", serialized);

    match Swap::deserialize(&serialized) {
        Ok(deserialized_swap) => {
            println!("Deserialized: qty_1 = {}, qty_2 = {}", deserialized_swap.qty_1, deserialized_swap.qty_2);
        }
        Err(_) => {
            println!("Deserialization failed");
        }
    }
}