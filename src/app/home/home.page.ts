import { Component } from '@angular/core';

import 'reflect-metadata';
import { range } from 'rxjs';
const formatMetadataKey = Symbol("format");
const requiredMetadataKey = Symbol("required");
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Приклад з попередньої лекції. Приклад1
  ras_interface()
{
  let show=new Show_console();
  let show1=new Show_file();
  let dog=new Dog("Собака","Рада","Рижа", new Date(2019, 4, 12),show);

  dog.run();
  dog.speak();
  dog.bringToy("Кістка");
  dog.guard();
  let cat=new Cat("Кішка","Мурка","Рижа", new Date(2017, 2, 2),show);
  cat.run();
  cat.speak();
 cat.bringMouse();
 let parrot=new Parrot("Папуга","Попка","Зелений", new Date(1996, 2, 2),show);

 parrot.fly();
 parrot.speak();
 let fish=new Fish("Рибка","Дорі","Золота", new Date(2020, 2, 2),show);

 fish.swim();
}
//Приклад2
logAndReturn<T>(arg: T): T {
  console.log(arg);
  return arg;
}

  ras_generic1()
  {
    let result = this.logAndReturn("hello generics");
    let result1 = this.logAndReturn(25);
    let result2=this.logAndReturn(Math.sin(2));
    let result3 =this.logAndReturn(true);
    let show=new Show_console();
    let parrot=new Parrot("Папуга","Попка","Зелений", new Date(1996, 2, 2),show);
    let result4=this.logAndReturn(parrot);
    let result5 = this.logAndReturn(show);
    let c = 25 + 3;
    let result6 = this.logAndReturn("Generic" +c);
  }
  //Приклад3
  ras_generic2()
  {
    let show=new Show_console();
    let collention: PetCollection<Pet> = new PetCollection();
 collention.add(new Fish("Рибка","Долі","Золота",new Date(2010, 4, 12),show))
   collention.add(new Dog("Собака","Рада","Рижа", new Date(2019, 4, 12),show));
   collention.add(new Cat("Кішка","Мурка","Рижа", new Date(2017, 2, 2),show));
   let item=collention.getItemByName("Рада");
   console.log(item);
   let item1=<Dog>item;
    item1.speak();
    item1.run();
  }
  //Приклад4
  ras()
  {

    var x = new ExampleSqr();
    var y = x.sqr(5); //  "Call: foo(23) => 46"
    var z = x.add(3, 5);
    let a = x.dob(1, 2, 3);
console.log(y);
    console.log(z);
    console.log(a);
  }
  //Приклад 5
  ras_decorator()
  {

    let m=new Module()
  }
  //Приклад 6
  ras_decorator_property()
  {
    let g=new Greeter("Олена");
    console.log(g.greet());
  }
  //Приклад 7
  ras_decorator_parameters()
  {
    let g=new Greeter1("Як справи?");
    console.log(g.greet("Олена"));
 // let name;
  // console.log(g.greet(name));
  }
  constructor() {}


}
//Приклад 7
class Greeter1 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @validate
  greet(@required name: string) {
    return "Привіт " + name + ", " + this.greeting;
  }
}
/**
 *
Декоратор @required додає запис метаданих, який позначає параметр як необхідний.
Потім декоратор @validate обгортає існуючий метод привітання у функцію,
яка перевіряє аргументи перед викликом вихідного методу.
 */
function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}
function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value;
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    );
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error("Помилка у параметрі.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}
//Приклад6
class Greeter {
  @format("Привіт, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
/**
 Декоратор @format ("Привіт,% s") - це фабрика декораторів.
 Коли викликається @format ("Привіт,% s"), він додає запис метаданих для властивості
 за допомогою функції Reflect.metadata з бібліотеки reflect-metadata.
 Коли викликається getFormat, він читає значення метаданих для формату.
 */
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
//Приклад5
function myFirstDecorator(constructor: Function) {
  console.log(constructor);
}

@myFirstDecorator
class Module {
  name: string;
  age: number;
}
//Приклад з попередньої лекції
interface IPet {
  name: string;
  //Властивості лише для читання
  readonly age: number;
  readonly color: string;
  readonly bday: Date;
};
interface IRun{
  run();
}
interface IToy
{
  bringToy(toy:string)
}
interface ISpeak{
  speak();
}
interface ISwim{
  swim();
}
interface IFly{
  fly();
}
abstract class Pet implements IPet {
  type:string;
  name:string;
  //Властивості лише для читання
  readonly color: string;
  readonly bday: Date;
  constructor(type:string,name:string,color:string,bday:Date,obj:IShow)
  {this.type=type;
    this.name=name;
     this.color=color;
     this.bday=bday;
     obj.show(this.type,this.name,this.color,this.age);
    }
  // геттер для розрахунку віку
  get age() {
    const diff = new Date(new Date().getTime() - this.bday.getTime());

    return diff.getFullYear() - new Date(0).getFullYear();
}

}
interface IShow
{
  show(type:string,name:string,color:string,age:number)
}
class Show_console  implements IShow
{
  show(type:string,name:string,color:string,age:number)
  {
    console.log("Я "+type+" на ім'я "+name);
    console.log("Мій кольор  "+color);
    console.log("Мій вік "+age+" років");
  }
}
class Show_file implements IShow
{
  show(type:string,name:string,color:string,age:number)
  {

  }
}
class Dog extends Pet implements  IRun, IToy,ISpeak
{

@log
  speak()
  {
    console.log("Гав-гав");
}
  @log
  run()
  {
    console.log("Бігу зі швидкістю 10 км/ч");
    return "V=10";
  }
 bringToy(toy:string)
{
  console.log("Моя улюблена іграшка "+toy);
}
guard()
{
  console.log("Вмію охраняти помешкання");
}
}
class Cat extends Pet implements IRun,ISpeak
{


  speak()
  {
    console.log("Мяв-Мяв");
  }
  run()
  {
    console.log("Бігу  зі швидкістю 15 км/ч");
  }

bringMouse()
{
  console.log("Вмію ловити мишей");
}
}
class Parrot extends Pet implements IFly,ISpeak
{

  speak()
  {
    console.log("Попка дурак");
  }


fly()
{
  console.log("Я вмію літати");
}
}
class Fish extends Pet implements ISwim
{


swim()
{
  console.log("Я плаваю під водою");
}
}
//Приклад3
class PetCollection<T extends IPet> {
  private itemAll: T[ ] = [];

  public add( item: T ): void {
      this.itemAll.push( item );
  }
  public getItemByName(name: string): T {
      return this.itemAll.find( item => item.name === name ); // Ok
  }
}
//Приклад4
class ExampleSqr {
  @log
  sqr(n: number) {
      return n * n;
  }
  @log
  add (a:number,b:number)
  {
    return a+b;
  }
  @log
  dob(a: number, b: number, c: number)
  {
    return a * b * c;
  }
}
function log(target: Object, key: string, value: any) {
  return {
      value: function (...args: any[]) {
        // конвертуємо список аргументів, що передані у метод sqr, в рядок
          var a = args.map(a => JSON.stringify(a)).join();
          // викликаємо sqr() та отримуємо його результат
          var result = value.value.apply(this, args);
          // переводимо результат у рядок
          var r = JSON.stringify(result);
          // Відображаємо результат виклику у консолі
          console.log(`Call: ${key}(${a}) => ${r}`);
          // повертаємо результат виконання sqr
          return result;
      }
  };
}
//Приклад5
@logClass
class Person {

  public name: string;
  public surname: string;

  constructor(name : string, surname : string) {
    this.name = name;
    this.surname = surname;
  }
}
function logClass(target: any) {

  // сохраняем ссылку на исходный конструктор
  var original = target;

  // вспомогательная функция для генерации экземпляров класса
  function construct(constructor, args) {
    var c : any = function () {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }

  // новое поведение конструктора
  var f : any = function (...args) {
    console.log("New: " + original.name);
    return construct(original, args);
  }

  // копируем прототип, чтобы работал оператор instanceof
  f.prototype = original.prototype;

  // возвращаем новый конструктор (он переопределит исходный)
  return f;
}
