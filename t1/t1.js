class Usuario{
  
  constructor(nombre,apellido){
    this.nombre=nombre
    this.apellido=apellido
    this.libros=[]
    this.mascotas=[]
  }
  getFullName(){
    return `${this.nombre} ${this.apellido}`
  }
  addMascota(mascotaName){
    this.mascotas.push(mascotaName)
  }
  countMascotas(){
    return this.mascotas.length
  }
  addBook(nombre,autor){
    let libro={nombre,autor}
    this.libros.push(libro)
  }
  getBookNames(){
    return this.libros.map(lib=>lib.nombre)
  }
}
const userLuis = new Usuario('Luis','Arias')
console.log(userLuis.getFullName())

userLuis.addBook('La Selva','Jorge Antupol')
userLuis.addBook('En mordor','Susana molina')
console.log(userLuis.getBookNames())

userLuis.addMascota('Perro')
userLuis.addMascota('Raton')
userLuis.addMascota('Hamster')
console.log(userLuis.countMascotas())